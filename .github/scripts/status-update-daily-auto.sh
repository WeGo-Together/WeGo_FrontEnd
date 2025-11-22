#!/bin/bash
set -e

echo "=== Auto Update Status Based on Dates ==="
echo "Current date: $(date -u +"%Y-%m-%d")"
echo "============================================"

TODAY=$(date -u +"%Y-%m-%d")

# Project의 모든 아이템 가져오기
query='query($projectId: ID!) {
  node(id: $projectId) {
    ... on ProjectV2 {
      items(first: 100) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          content {
            ... on Issue {
              id
              number
              title
            }
          }
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldDateValue {
                field {
                  ... on ProjectV2Field {
                    id
                    name
                  }
                }
                date
              }
              ... on ProjectV2ItemFieldSingleSelectValue {
                field {
                  ... on ProjectV2SingleSelectField {
                    id
                    name
                  }
                }
                optionId
                name
              }
            }
          }
        }
      }
    }
  }
}'

echo "Fetching project items..."
response=$(gh api graphql -f query="$query" -f projectId="$PROJECT_ID")

# 아이템 개수 확인
item_count=$(echo "$response" | jq '.data.node.items.nodes | length')
echo "Found $item_count items in project"
echo ""

updated_count=0
skipped_count=0
error_count=0

# 프로세스 치환 사용 (while 루프가 서브셸에서 실행되지 않도록)
while read -r item; do
  item_id=$(echo "$item" | jq -r '.id')
  issue_number=$(echo "$item" | jq -r '.content.number // "N/A"')
  issue_title=$(echo "$item" | jq -r '.content.title // "Unknown"')
  
  echo "Processing Item ID: $item_id (Issue #$issue_number)"
  
  # Start Date 추출
  start_date=$(echo "$item" | jq -r --arg field_id "$START_DATE_FIELD_ID" '
    .fieldValues.nodes[] | 
    select(.field.id == $field_id) | 
    .date // empty
  ')
  
  # Target Date 추출
  target_date=$(echo "$item" | jq -r --arg field_id "$TARGET_DATE_FIELD_ID" '
    .fieldValues.nodes[] | 
    select(.field.id == $field_id) | 
    .date // empty
  ')
  
  # 현재 Status 추출
  current_status_option_id=$(echo "$item" | jq -r --arg field_id "$STATUS_FIELD_ID" '
    .fieldValues.nodes[] | 
    select(.field.id == $field_id) | 
    .optionId // empty
  ')
  
  current_status_name=$(echo "$item" | jq -r --arg field_id "$STATUS_FIELD_ID" '
    .fieldValues.nodes[] | 
    select(.field.id == $field_id) | 
    .name // "No Status"
  ')
  
  echo "  Start Date: ${start_date:-"Not set"}"
  echo "  Target Date: ${target_date:-"Not set"}"
  echo "  Current Status: $current_status_name"
  
  # Done 상태면 스킵
  if [ "$current_status_option_id" = "$DONE_OPTION_ID" ]; then
    echo "  ⊘ Skipped (already Done)"
    ((skipped_count++))
    echo ""
    continue
  fi
  
  # 날짜가 없으면 스킵
  if [ -z "$start_date" ] || [ -z "$target_date" ]; then
    echo "  ⊘ Skipped (missing dates)"
    ((skipped_count++))
    echo ""
    continue
  fi
  
  # 날짜 비교
  if [ "$TODAY" \> "$start_date" ] || [ "$TODAY" = "$start_date" ]; then
    if [ "$TODAY" \< "$target_date" ] || [ "$TODAY" = "$target_date" ]; then
      echo "  → Today is within date range, updating to In Progress..."
      
      # 이미 In Progress면 스킵
      if [ "$current_status_option_id" = "$IN_PROGRESS_OPTION_ID" ]; then
        echo "  ⊘ Already In Progress"
        ((skipped_count++))
        echo ""
        continue
      fi
      
      # Status를 In Progress로 변경
      update_response=$(gh api graphql \
        -f query='mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
          updateProjectV2ItemFieldValue(input: {
            projectId: $projectId,
            itemId: $itemId,
            fieldId: $fieldId,
            value: { singleSelectOptionId: $optionId }
          }) {
            projectV2Item {
              id
            }
          }
        }' \
        -f projectId="$PROJECT_ID" \
        -f itemId="$item_id" \
        -f fieldId="$STATUS_FIELD_ID" \
        -f optionId="$IN_PROGRESS_OPTION_ID" 2>&1)
      
      if echo "$update_response" | jq -e '.data.updateProjectV2ItemFieldValue.projectV2Item.id' > /dev/null 2>&1; then
        echo "  ✓ Updated to In Progress"
        ((updated_count++))
      else
        echo "  ✗ Failed to update status"
        echo "  Response: $update_response"
        ((error_count++))
      fi
    else
      echo "  ⊘ Skipped (after target date)"
      ((skipped_count++))
    fi
  else
    echo "  ⊘ Skipped (before start date)"
    ((skipped_count++))
  fi
  
  echo ""
done < <(echo "$response" | jq -c '.data.node.items.nodes[]')

echo "============================================"
echo "=== Summary ==="
echo "Total items processed: $item_count"
echo "Updated to In Progress: $updated_count"
echo "Skipped: $skipped_count"
echo "Errors: $error_count"