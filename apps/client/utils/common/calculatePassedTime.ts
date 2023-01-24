const calculatePassedTime = (createdAt: string) => {
  const now = new Date();
  const writeDay = new Date(createdAt);

  const difference = now.getTime() - writeDay.getTime();

  const seconds = difference / 1000;
  if (seconds < 60) return `now`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}m`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}h`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}d`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}w`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}m`;
  const years = days / 365;
  return `${Math.floor(years)}y`;
};

export default calculatePassedTime;
