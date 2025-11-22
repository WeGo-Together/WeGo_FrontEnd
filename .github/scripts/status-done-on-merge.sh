#!/bin/bash
set -e

echo "=== Auto Update Status to Done on PR Merge ==="
echo "PR #${PR_NUMBER} was merged"
echo "============================================"

# PR 본문에서 이슈 번호 추출
# Closes #123, Fixes #456, Resolves #789 등을 찾음
issue_numbers=$(echo "$PR_BODY" | grep -iE '(close[sd]?|fix(e[sd])?|resolve[sd]?) #[0-9]+' | grep -oE '#[0-9]+' | sed 's/#//' | sort -u || true)

if [ -z "$issue_numbers" ]; then
  echo "No linked issues found in PR body"
  echo "Tip: Use 'Closes #123' in PR description to link issues"
  exit 0
fi

echo "Found linked issues: $(echo $issue_numbers | tr '\n' ' ')"
echo ""

updated_count=0
skipped_count=0
error_count=0

# 각 이슈 처리
for issue_number in $issue_numbers; do
  echo "Processing Issue #$issue_number..."
  
  # 이슈 정보 가져오기
  issue_query='query($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
      issue(number: $number) {
        id
        number
        title
        state
      }
    }
  }'
  
  issue_response=$(gh api graphql \
    -f query="$issue_query" \
    -f owner="$REPO_OWNER" \
    -f repo="$REPO_NAME" \
    -F number="$issue_number")
  
  issue_id=$(echo "$issue_response" | jq -r '.data.repository.issue.id // empty')
  issue_state=$(echo "$issue_response" | jq -r '.data.repository.issue.state // empty')
  issue_title=$(echo "$issue_response" | jq -r '.data.repository.issue.title // empty')
  
  if [ -z "$issue_id" ]; then
    echo "  ✗ Issue #$issue_number not found"
    error_count=$((error_count + 1))
    echo ""
    continue
  fi
  
  echo "  Title: $issue_title"
  echo "  State: $issue_state"
  
  # 이미 closed 상태인지 확인
  if [ "$issue_state" != "OPEN" ]; then
    echo "  ⊘ Issue is already closed"
    skipped_count=$((skipped_count + 1))
    echo ""
    continue
  fi
  
  # Project에서 이슈 찾기
  project_query='query($projectId: ID!) {
    node(id: $projectId) {
      ... on ProjectV2 {
        items(first: 100) {
          nodes {
            id
            content {
              ... on Issue {
                id
                number
              }
            }
            fieldValues(first: 20) {
              nodes {
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
  
  project_response=$(gh api graphql -f query="$project_query" -f projectId="$PROJECT_ID")
  
  item_id=$(echo "$project_response" | jq -r --arg issue_id "$issue_id" '
    .data.node.items.nodes[] | 
    select(.content.id == $issue_id) | 
    .id
  ')
  
  if [ -z "$item_id" ] || [ "$item_id" = "null" ]; then
    echo "  ⊘ Issue not in project"
    skipped_count=$((skipped_count + 1))
    echo ""
    continue
  fi
  
  echo "  Found in project (item_id: $item_id)"
  
  # 현재 Status 확인
  current_status=$(echo "$project_response" | jq -r --arg issue_id "$issue_id" --arg field_id "$STATUS_FIELD_ID" '
    .data.node.items.nodes[] | 
    select(.content.id == $issue_id) |
    .fieldValues.nodes[] | 
    select(.field.id == $field_id) | 
    .name // "No Status"
  ')
  
  current_status_id=$(echo "$project_response" | jq -r --arg issue_id "$issue_id" --arg field_id "$STATUS_FIELD_ID" '
    .data.node.items.nodes[] | 
    select(.content.id == $issue_id) |
    .fieldValues.nodes[] | 
    select(.field.id == $field_id) | 
    .optionId // empty
  ')
  
  echo "  Current Status: $current_status"
  
  # 이미 Done이면 스킵
  if [ "$current_status_id" = "$DONE_OPTION_ID" ]; then
    echo "  ⊘ Already Done"
    skipped_count=$((skipped_count + 1))
    echo ""
    continue
  fi
  
  # Status를 Done으로 변경
  echo "  Updating status to Done..."
  
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
    -f optionId="$DONE_OPTION_ID" 2>&1)
  
  if echo "$update_response" | jq -e '.data.updateProjectV2ItemFieldValue.projectV2Item.id' > /dev/null 2>&1; then
    echo "  ✓ Updated to Done"
    updated_count=$((updated_count + 1))
  else
    echo "  ✗ Failed to update status"
    echo "  Response: $update_response"
    error_count=$((error_count + 1))
  fi
  
  echo ""
done

echo "============================================"
echo "=== Summary ==="
echo "PR #${PR_NUMBER} merged"
echo "Linked issues found: $(echo $issue_numbers | wc -w)"
echo "Updated to Done: $updated_count"
echo "Skipped: $skipped_count"
echo "Errors: $error_count"
echo "============================================"

exit 0