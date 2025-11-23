#!/bin/bash
set -e

NPMRC_PATH=$1
PNPM_STORE_PATH=$2

# 0. Swap 메모리 설정
if [ ! -f /swapfile ]; then
  echo "💾 Swap 메모리 4GB를 생성합니다."
  sudo fallocate -l 4G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  
  # 재부팅 후에도 자동 마운트
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  
  echo "✅ Swap 메모리가 생성되었습니다."
  sudo swapon --show
  sudo free -h
else
  echo "✅ Swap 메모리가 이미 설정되어 있습니다."
  sudo swapon --show
  sudo free -h
fi

# 1. Node.js 설치 체크
if ! command -v node &> /dev/null; then
  echo "📦 Node.js 24 버전 설치를 시작합니다."
  
  sudo apt-get update && \
  sudo apt-get install -y ca-certificates curl gnupg && \
  mkdir -p /etc/apt/keyrings && \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
  NODE_MAJOR=24 && \
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list && \
  sudo apt-get update && \
  sudo apt-get install nodejs -y
  
  echo "✅ Node.js $(node -v) 버전이 설치되었습니다."
else
  echo "✅ Node.js $(node -v) 버전이 이미 설치되어 있습니다."
fi

# 2. Corepack 활성화 및 pnpm 설치
if ! command -v pnpm &> /dev/null; then
  echo "📦 Corepack을 활성화하고 pnpm을 설치합니다."
  sudo corepack enable
  corepack prepare pnpm@10.13.1 --activate
  echo "✅ pnpm $(pnpm -v) 버전이 설치되었습니다."
else
  CURRENT_PNPM_VERSION=$(pnpm -v)
  if [ "$CURRENT_PNPM_VERSION" != "10.13.1" ]; then
    echo "⚙️ pnpm을 ${CURRENT_PNPM_VERSION}에서 10.13.1로 변경합니다."
    corepack prepare pnpm@10.13.1 --activate
    echo "✅ pnpm $(pnpm -v) 버전이 설치되었습니다."
  else
    echo "✅ pnpm 10.13.1 버전이 이미 설치되어 있습니다."
  fi
fi

# 3. PM2 설치 체크
if ! command -v pm2 &> /dev/null; then
  echo "📦 PM2 설치를 시작합니다."
  sudo npm install -g pm2
  
  echo "⚙️ PM2 초기 설정을 진행합니다."
  sudo sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
  
  echo "✅ PM2 $(pm2 -v) 버전이 설치되었습니다."
else
  echo "✅ PM2 $(pm2 -v) 버전이 이미 설치되어 있습니다."
fi

# 4. Nginx 설치 체크
if ! command -v nginx &> /dev/null; then
  echo "📦 Nginx 설치를 시작합니다."
  sudo apt-get install -y nginx
  echo "✅ Nginx $(nginx -v 2>&1 | grep -oP '(?<=nginx/)[0-9.]+') 버전이 설치되었습니다."
else
  echo "✅ Nginx $(nginx -v 2>&1 | grep -oP '(?<=nginx/)[0-9.]+') 버전이 이미 설치되어 있습니다."
fi

# 5. Nginx 설정 수정 (server_names_hash_bucket_size)
echo "⚙️ Nginx server_names_hash_bucket_size 설정을 확인합니다."

if grep -q "server_names_hash_bucket_size" /etc/nginx/nginx.conf; then
  # 설정이 존재하면 값 확인
  CURRENT_VALUE=$(grep "server_names_hash_bucket_size" /etc/nginx/nginx.conf | grep -oP '\d+' | head -1)
  
  if [ "$CURRENT_VALUE" != "128" ]; then
    echo "⚙️ server_names_hash_bucket_size를 $CURRENT_VALUE에서 128로 변경합니다."
    sudo sed -i 's/server_names_hash_bucket_size [0-9]\+;/server_names_hash_bucket_size 128;/' /etc/nginx/nginx.conf
    echo "✅ Nginx 설정이 수정되었습니다."
  else
    echo "✅ server_names_hash_bucket_size가 이미 128로 설정되어 있습니다."
  fi
else
  # 설정이 없으면 추가
  echo "⚙️ server_names_hash_bucket_size 128을 추가합니다."
  sudo sed -i '/http {/a \    server_names_hash_bucket_size 128;' /etc/nginx/nginx.conf
  echo "✅ Nginx 설정이 추가되었습니다."
fi

# 5. .npmrc 설정
if [ ! -f "$NPMRC_PATH" ]; then
  echo "⚙️ .npmrc 파일을 생성중입니다."
  echo "store-dir=$PNPM_STORE_PATH" > "$NPMRC_PATH"
  echo "shamefully-hoist=true" >> "$NPMRC_PATH"
  echo "✅ .npmrc 파일이 생성되었습니다."
else
  echo "✅ .npmrc 가 이미 존재합니다."
fi

# 6. 필요한 디렉토리 생성
echo "📁 필수 디렉토리 생성을 시작합니다."
mkdir -p /home/ubuntu/.pnpm-store
mkdir -p /home/ubuntu/scripts/ec2

echo "✅ EC2 설정이 완료되었습니다."