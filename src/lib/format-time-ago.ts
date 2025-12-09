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
