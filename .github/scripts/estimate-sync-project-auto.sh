#!/bin/bash
set -e

echo "=== Issue Project Sync ==="
echo "Issue #${ISSUE_NUMBER}: ${ISSUE_TITLE}"
echo "Labels: ${ISSUE_LABELS}"
echo "=========================="

# Point 라벨 추출
point_labels=$(echo "$ISSUE_LABELS" | jq -r '.[].name' | grep -E '^point:[ ]*(1[0-6]|[1-9])$' || true)

if [ -n "$point_labels" ]; then
  point_label=$(echo "$point_labels" | head -1)
  point_value=$(echo "$point_label" | grep -oE '(1[0-6]|[1-9])')
  echo "✓ Found point label: $point_label (value: $point_value)"
  HAS_POINT=true
else
  echo "✗ No point label found"
  HAS_POINT=false
  point_value=""
fi

# Project에 있는지 확인
echo ""
echo "Checking if issue exists in project..."

check_query='query($projectId: ID!) {
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
        }
      }
    }
  }
}'

check_response=$(gh api graphql -f query="$check_query" -f projectId="$PROJECT_ID")
item_id=$(echo "$check_response" | jq -r --arg issue_id "$ISSUE_ID" '.data.node.items.nodes[] | select(.content.id == $issue_id) | .id')

if [ -n "$item_id" ] && [ "$item_id" != "null" ]; then
  echo "✓ Issue found in project (item_id: $item_id)"
  IN_PROJECT=true
else
  echo "✗ Issue not in project"
  IN_PROJECT=false
  item_id=""
fi

echo ""
echo "=== Processing ==="

# Case 1: point 라벨 있음 + Project에 없음 → 추가 + Estimate + 날짜 설정
if [ "$HAS_POINT" = "true" ] && [ "$IN_PROJECT" = "false" ]; then
  echo "Adding issue to project..."
  
  add_mutation='mutation($projectId: ID!, $contentId: ID!) {
    addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
      item {
        id
      }
    }
  }'
  
  add_response=$(gh api graphql -f query="$add_mutation" -f projectId="$PROJECT_ID" -f contentId="$ISSUE_ID")
  item_id=$(echo "$add_response" | jq -r '.data.addProjectV2ItemById.item.id')
  
  if [ -n "$item_id" ] && [ "$item_id" != "null" ]; then
    echo "✓ Added to project (item_id: $item_id)"
    IN_PROJECT=true
    
    # Estimate 설정
    echo "Setting estimate to $point_value..."
    update_response=$(gh api graphql \
      -f query='mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: Float!) {
        updateProjectV2ItemFieldValue(input: {
          projectId: $projectId,
          itemId: $itemId,
          fieldId: $fieldId,
          value: { number: $value }
        }) {
          projectV2Item { id }
        }
      }' \
      -f projectId="$PROJECT_ID" \
      -f itemId="$item_id" \
      -f fieldId="$ESTIMATE_FIELD_ID" \
      -F value="$point_value")
    
    if echo "$update_response" | jq -e '.data.updateProjectV2ItemFieldValue.projectV2Item.id' > /dev/null 2>&1; then
      echo "✓ Set estimate to $point_value"
    else
      echo "⚠ Failed to set estimate"
    fi

    # 오늘 날짜 (ISO 8601 format)
    TODAY=$(date -u +"%Y-%m-%d")
    echo "Today's date: $TODAY"

    # Start Date 설정
    if [ -n "$START_DATE_FIELD_ID" ]; then
      echo "Setting start date to $TODAY..."
      
      start_date_response=$(gh api graphql \
        -f query='mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $dateValue: Date!) {
          updateProjectV2ItemFieldValue(input: {
            projectId: $projectId,
            itemId: $itemId,
            fieldId: $fieldId,
            value: { date: $dateValue }
          }) {
            projectV2Item { id }
          }
        }' \
        -f projectId="$PROJECT_ID" \
        -f itemId="$item_id" \
        -f fieldId="$START_DATE_FIELD_ID" \
        -f dateValue="$TODAY")
      
      if echo "$start_date_response" | jq -e '.data.updateProjectV2ItemFieldValue.projectV2Item.id' > /dev/null 2>&1; then
        echo "✓ Set start date to $TODAY"
      else
        echo "⚠ Failed to set start date"
        echo "Response: $start_date_response"
      fi
    fi

    # Target Date 설정
    if [ -n "$TARGET_DATE_FIELD_ID" ]; then
      echo "Setting target date to $TODAY..."
      
      target_date_response=$(gh api graphql \
        -f query='mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $dateValue: Date!) {
          updateProjectV2ItemFieldValue(input: {
            projectId: $projectId,
            itemId: $itemId,
            fieldId: $fieldId,
            value: { date: $dateValue }
          }) {
            projectV2Item { id }
          }
        }' \
        -f projectId="$PROJECT_ID" \
        -f itemId="$item_id" \
        -f fieldId="$TARGET_DATE_FIELD_ID" \
        -f dateValue="$TODAY")
      
      if echo "$target_date_response" | jq -e '.data.updateProjectV2ItemFieldValue.projectV2Item.id' > /dev/null 2>&1; then
        echo "✓ Set target date to $TODAY"
      else
        echo "⚠ Failed to set target date"
        echo "Response: $target_date_response"
      fi
    fi
    
  else
    echo "✗ Failed to add to project"
    echo "Response: $add_response"
    exit 1
  fi
fi

# Case 2: point 라벨 있음 + Project에 있음 → Estimate만 업데이트 (날짜는 건드리지 않음)
if [ "$HAS_POINT" = "true" ] && [ "$IN_PROJECT" = "true" ]; then
  echo "Updating estimate to $point_value..."
  
  update_response=$(gh api graphql \
    -f query='mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: Float!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId,
        itemId: $itemId,
        fieldId: $fieldId,
        value: {
          number: $value
        }
      }) {
        projectV2Item {
          id
        }
      }
    }' \
    -f projectId="$PROJECT_ID" \
    -f itemId="$item_id" \
    -f fieldId="$ESTIMATE_FIELD_ID" \
    -F value="$point_value")
  
  if echo "$update_response" | jq -e '.data.updateProjectV2ItemFieldValue.projectV2Item.id' > /dev/null 2>&1; then
    echo "✓ Updated estimate to $point_value"
  else
    echo "✗ Failed to update estimate"
    echo "Response: $update_response"
    exit 1
  fi
fi

# Case 3: point 라벨 없음 + Project에 있음 → Project에서 제거
if [ "$HAS_POINT" = "false" ] && [ "$IN_PROJECT" = "true" ]; then
  echo "Clearing estimate field (keeping issue in project)..."
  
  clear_mutation='mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!) {
    clearProjectV2ItemFieldValue(input: {
      projectId: $projectId,
      itemId: $itemId,
      fieldId: $fieldId
    }) {
      projectV2Item {
        id
      }
    }
  }'
  
  clear_response=$(gh api graphql \
    -f query="$clear_mutation" \
    -f projectId="$PROJECT_ID" \
    -f itemId="$item_id" \
    -f fieldId="$ESTIMATE_FIELD_ID")
  
  if echo "$clear_response" | jq -e '.data.clearProjectV2ItemFieldValue.projectV2Item.id' > /dev/null 2>&1; then
    echo "✓ Cleared estimate field (other fields preserved)"
  else
    echo "⚠ Failed to clear estimate field (might already be empty)"
    echo "Response: $clear_response"
    # Exit 하지 않음 - 이미 비어있을 수 있음
  fi
fi

# Case 4: point 라벨 없음 + Project에 없음 → 아무것도 안 함
if [ "$HAS_POINT" = "false" ] && [ "$IN_PROJECT" = "false" ]; then
  echo "No action needed (no point label and not in project)"
fi

echo ""
echo "=== Summary ==="
echo "Issue #${ISSUE_NUMBER}: ${ISSUE_TITLE}"
echo "Has point label: $HAS_POINT"
[ "$HAS_POINT" = "true" ] && echo "Point value: $point_value"
echo "In project: $IN_PROJECT"