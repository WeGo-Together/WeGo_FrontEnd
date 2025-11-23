#!/bin/bash
set -e

APP_DIR=$1
PM2_APP_NAME=$2
BRANCH=$3

echo "🧹 Preview 환경을 정리합니다..."
echo "  APP_DIR: $APP_DIR"
echo "  PM2_APP_NAME: $PM2_APP_NAME"
echo "  BRANCH: $BRANCH"
echo ""

# PM2 프로세스 중지 및 삭제
echo "🛑 PM2 프로세스를 중지합니다..."
pm2 delete "$PM2_APP_NAME" 2>/dev/null || echo "⚠️  PM2 프로세스가 없습니다: $PM2_APP_NAME"
pm2 save

# 배포 디렉토리 삭제
if [ -d "/home/ubuntu/$APP_DIR" ]; then
  echo "🗑️  배포 디렉토리를 삭제합니다: /home/ubuntu/$APP_DIR"
  rm -rf "/home/ubuntu/$APP_DIR"
else
  echo "⚠️  배포 디렉토리가 없습니다: /home/ubuntu/$APP_DIR"
fi

# Nginx 설정 파일 삭제
NGINX_CONFIG="/etc/nginx/conf.d/preview-${BRANCH}.conf"
if [ -f "$NGINX_CONFIG" ]; then
  echo "🗑️  Nginx 설정 파일을 삭제합니다: $NGINX_CONFIG"
  sudo rm -f "$NGINX_CONFIG"
else
  echo "⚠️  Nginx 설정 파일이 없습니다: $NGINX_CONFIG"
fi

# Nginx 재시작
echo "🔄 Nginx를 재시작합니다..."
if sudo nginx -t; then
  sudo systemctl reload nginx
  echo "✅ Nginx reload 완료"
else
  echo "❌ Nginx 설정 테스트 실패"
  exit 1
fi

echo ""
echo "✅ Preview 환경 정리 완료!"
pm2 list