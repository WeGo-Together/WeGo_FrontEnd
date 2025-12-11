export const formatISO = (dateString: string) => {
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${d}`;
};

export const formatTimeAgo = (isoString: string) => {
  const dateInput = new Date(isoString);
  const dateNow = new Date();

  const diffPerSec = (dateNow.getTime() - dateInput.getTime()) / 1000;
  if (diffPerSec < 60) return `${Math.ceil(diffPerSec)}초 전`;

  const diffPerMin = diffPerSec / 60;
  if (diffPerMin < 60) return `${Math.ceil(diffPerMin)}분 전`;

  const diffPerHour = diffPerMin / 60;
  if (diffPerHour < 24) return `${Math.ceil(diffPerHour)}시간 전`;

  const diffPerDay = diffPerHour / 30;
  if (diffPerDay < 30) return `${Math.ceil(diffPerDay)}일 전`;

  const yearDiff = dateNow.getFullYear() - dateInput.getFullYear();
  const monthDiff = dateNow.getMonth() - dateInput.getMonth();
  const diffPerMonth = yearDiff * 12 + monthDiff;
  if (diffPerMonth < 12) return `${diffPerMonth}개월 전`;
  return `${yearDiff}년 전`;
};

// 모임 시작 시간을 Card 컴포넌트용 형식으로 변환 (예: "25. 12. 25 - 19:00")
export const formatDateTime = (startTime: string, _endTime?: string | null): string => {
  const start = new Date(startTime);
  const year = start.getFullYear().toString().slice(-2);
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');
  const hours = String(start.getHours()).padStart(2, '0');
  const minutes = String(start.getMinutes()).padStart(2, '0');

  return `${year}. ${month}. ${day} - ${hours}:${minutes}`;
};
