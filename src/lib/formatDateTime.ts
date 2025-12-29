export const formatISO = (dateString: string) => {
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${d}`;
};

export const formatTimeAgo = (isoString: string) => {
  const dateInput = new Date(isoString.endsWith('Z') ? isoString : `${isoString}Z`);
  const dateNow = new Date();

  if (dateInput.getTime() >= dateNow.getTime()) return '0초 전';

  const diffPerSec = Math.floor((dateNow.getTime() - dateInput.getTime()) / 1000);
  if (diffPerSec < 60) return `${diffPerSec}초 전`;

  const diffPerMin = Math.floor(diffPerSec / 60);
  if (diffPerMin < 60) return `${diffPerMin}분 전`;

  const diffPerHour = Math.floor(diffPerMin / 60);
  if (diffPerHour < 24) return `${diffPerHour}시간 전`;

  const diffPerDay = Math.floor(diffPerHour / 24);
  if (diffPerDay < 30) return `${diffPerDay}일 전`;

  const yearDiff = dateNow.getFullYear() - dateInput.getFullYear();
  const monthDiff = dateNow.getMonth() - dateInput.getMonth();
  const diffPerMonth = yearDiff * 12 + monthDiff;
  if (diffPerMonth < 12) return `${diffPerMonth}개월 전`;
  return `${yearDiff}년 전`;
};

// 모임 시작 시간을 Card 컴포넌트용 형식으로 변환 (예: "25. 12. 25 - 19:00")
export const formatDateTime = (startTime: string, customFormat?: string): string => {
  const start = new Date(startTime);

  const fullYear = start.getFullYear().toString();
  const shortYear = fullYear.slice(-2);
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');
  const hours = String(start.getHours()).padStart(2, '0');
  const minutes = String(start.getMinutes()).padStart(2, '0');
  const seconds = String(start.getSeconds()).padStart(2, '0');

  if (!customFormat) return `${shortYear}. ${month}. ${day} - ${hours}:${minutes}`;

  return customFormat
    .replace(/yyyy/g, fullYear)
    .replace(/yy/g, shortYear)
    .replace(/MM/g, month)
    .replace(/dd/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds);
};
