#!/bin/bash
set -e

APP_DIR=$1
APP_PORT=$2
PM2_APP_NAME=$3
COMPRESSED_FILE_NAME=$4
ENV_VARIABLE=$5

# 기존 배포 디렉토리 삭제
rm -rf /home/ubuntu/$APP_DIR/current

# 새 배포 디렉토리 생성
mkdir /home/ubuntu/$APP_DIR/current

# 압축 파일 이동
mv /home/ubuntu/$APP_DIR/build/$COMPRESSED_FILE_NAME /home/ubuntu/$APP_DIR/current/$COMPRESSED_FILE_NAME

# 압축 해제
cd /home/ubuntu/$APP_DIR/current
tar -xvf $COMPRESSED_FILE_NAME
rm $COMPRESSED_FILE_NAME

# 환경변수 생성
echo "🔐 .env 파일을 생성합니다."
cat > .env << 'EOF'
$ENV_VARIABLE
EOF

# 로그 파일 경로
MONITOR_LOG="/tmp/pnpm-install-monitor.log"
rm -f $MONITOR_LOG

# 백그라운드 모니터링 함수
monitor_resources() {
  local log_file=$1
  echo "시간,메모리(MB),디스크(GB)" > $log_file
  
  while true; do
    timestamp=$(date +%H:%M:%S)
    mem_used=$(free -m | grep "Mem:" | awk '{print $3}')
    disk_used=$(df -BG / | tail -1 | awk '{print $3}' | sed 's/G//')
    
    echo "$timestamp,$mem_used,$disk_used" >> $log_file
    sleep 1
  done
}

# 의존성 설치
echo "📦 의존성을 설치합니다..."
echo "📊 시스템 리소스 모니터링 중..."

# 백그라운드로 모니터링 시작
monitor_resources $MONITOR_LOG &
MONITOR_PID=$!

# pnpm install 설정
HUSKY=0 pnpm install --frozen-lockfile

# 모니터링 종료
kill $MONITOR_PID 2>/dev/null || true
wait $MONITOR_PID 2>/dev/null || true

# 결과 출력
if [ -f $MONITOR_LOG ]; then
  echo ""
  echo "📊 pnpm install 중 리소스 사용량:"
  echo "─────────────────────────────────────────"
  
  # 통계 계산
  MIN_MEM=$(tail -n +2 $MONITOR_LOG | cut -d',' -f2 | sort -n | head -1)
  MAX_MEM=$(tail -n +2 $MONITOR_LOG | cut -d',' -f2 | sort -n | tail -1)
  AVG_MEM=$(tail -n +2 $MONITOR_LOG | cut -d',' -f2 | awk '{sum+=$1} END {printf "%.0f", sum/NR}')
  
  MIN_DISK=$(tail -n +2 $MONITOR_LOG | cut -d',' -f3 | sort -n | head -1)
  MAX_DISK=$(tail -n +2 $MONITOR_LOG | cut -d',' -f3 | sort -n | tail -1)
  
  DURATION=$(tail -n +2 $MONITOR_LOG | wc -l)
  
  echo "  💾 메모리 사용량:"
  echo "    - 최소: ${MIN_MEM}MB"
  echo "    - 최대: ${MAX_MEM}MB"
  echo "    - 평균: ${AVG_MEM}MB"
  echo ""
  echo "  💿 디스크 사용량:"
  echo "    - 시작: ${MIN_DISK}GB"
  echo "    - 종료: ${MAX_DISK}GB"
  echo "    - 증가: $((MAX_DISK - MIN_DISK))GB"
  echo ""
  echo "  ⏱️  설치 소요 시간: ${DURATION}초"
  echo "─────────────────────────────────────────"
  echo "📊 전체 모니터링 데이터:"
  cat $MONITOR_LOG | column -t -s','
  echo "─────────────────────────────────────────"
  echo ""
  # 로그 파일 삭제
  rm -f $MONITOR_LOG
fi

# PM2 재시작
echo "🔄 애플리케이션을 재시작합니다."
cd /home/ubuntu/$APP_DIR/current
PORT=$APP_PORT pm2 reload $PM2_APP_NAME --update-env || PORT=$APP_PORT pm2 start pnpm --name "$PM2_APP_NAME" -- start

# PM2 저장
echo "✅ PM2 프로세스 목록을 저장합니다."
pm2 save

# PM2 List 출력
echo "ℹ️ 현재 실행중인 PM2 프로세스 목록"
pm2 list