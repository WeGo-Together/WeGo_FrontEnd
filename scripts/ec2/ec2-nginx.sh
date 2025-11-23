#!/bin/bash
set -e

# wego.link
# feat-auth.preview.wego.link

# Production 배포일 때는 공백, preview일때는 뒤에 . 까지 포함
# ex) feat-auth.preview.

BRANCH=$1
APP_DOMAIN=$2
APP_PORT=$3

echo "🚀 Nginx 설정을 시작합니다..."
echo "  BRANCH: '$BRANCH'"
echo "  APP_DOMAIN: '$APP_DOMAIN'"
echo "  APP_PORT: '$APP_PORT'"
echo ""

# BRANCH에 따라 CONFIG_NAME 결정
if [ "$BRANCH" = "main" ]; then
  CONFIG_NAME="${BRANCH}"
  SUB_APP_DOMAIN=""
else
  CONFIG_NAME="preview-${BRANCH}"
  SUB_APP_DOMAIN="${BRANCH}.preview."
fi

# 템플릿 파일 경로
TEMPLATE_FILE="/home/ubuntu/templates/example.nginx.tpl"
CONFIG_FILE="/etc/nginx/conf.d/${CONFIG_NAME}.conf"

echo "📝 설정 파일명: ${CONFIG_NAME}.conf"

# example.nginx.tpl 파일을 EC2 home/ubuntu/templates 경로에 저장
# example.nginx.tpl 파일이 EC2 에 저장되어있다면 패스

if [ ! -f "$TEMPLATE_FILE" ]; then
  echo "❌ 템플릿 파일을 찾을 수 없습니다: $TEMPLATE_FILE"
  exit 1
fi

echo "✅ 템플릿 파일 확인 완료"

# example.nginx.tpl 파일을 참고하여 브랜치별 config파일을 etc/nginx/conf.d 에 생성
# 예시) preview-feat-auth.conf
# Nginx config 생성
echo "📝 Nginx 설정 파일을 생성합니다..."
export SUB_APP_DOMAIN APP_DOMAIN APP_PORT
envsubst "\$SUB_APP_DOMAIN \$APP_DOMAIN \$APP_PORT" < "$TEMPLATE_FILE" \
  | sudo tee "$CONFIG_FILE" >/dev/null

echo "✅ 설정 파일 생성 완료: $CONFIG_FILE"
echo ""

# 생성된 config 파일 출력
echo "📄 생성된 Nginx 설정:"
echo "─────────────────────────────────────────"
sudo head -80 "$CONFIG_FILE"
echo "─────────────────────────────────────────"
echo ""

# Nginx 설정 테스트
echo "🔍 Nginx 설정을 테스트합니다..."
if sudo nginx -t; then
  echo "✅ Nginx 설정 테스트 통과"
else
  echo "❌ Nginx 설정 테스트 실패"
  exit 1
fi
echo ""

# Nginx 재시작
echo "🔄 Nginx를 재시작합니다..."
if systemctl is-active --quiet nginx; then
  sudo systemctl reload nginx
  echo "✅ Nginx reload 완료"
else
  sudo systemctl start nginx
  echo "✅ Nginx start 완료"
fi
echo ""

# Nginx 상태 확인
echo "📊 Nginx 상태:"
(systemctl status nginx --no-pager -l || true) | head -20
echo ""

# 테스트 요청
echo "🧪 HTTP 테스트 요청:"
curl -sI -H "Host: ${SUB_APP_DOMAIN}${APP_DOMAIN}" http://127.0.0.1 \
  | grep -iE "http/|server|cache-control|location" || true


echo ""
echo "✅ Nginx 설정 완료!"