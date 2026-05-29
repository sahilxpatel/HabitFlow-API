import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const calculateStreak = (dates: Date[]): number => {
  if (!dates || dates.length === 0) {
    return 0;
  }

  // Normalize all dates to start of day UTC and sort descending
  const sortedDates = dates
    .map((d) => dayjs(d).utc().startOf('day').valueOf())
    .sort((a, b) => b - a);

  // Remove duplicates just in case
  const uniqueDates = Array.from(new Set(sortedDates));

  const today = dayjs().utc().startOf('day').valueOf();
  const yesterday = dayjs().utc().subtract(1, 'day').startOf('day').valueOf();

  // If the last tracked date is not today and not yesterday, the streak is broken
  const lastTrackedDate = uniqueDates[0];
  if (lastTrackedDate !== today && lastTrackedDate !== yesterday) {
    return 0;
  }

  let streak = 0;
  let currentDate = lastTrackedDate;

  for (const date of uniqueDates) {
    if (date === currentDate) {
      streak++;
      currentDate = dayjs(currentDate).utc().subtract(1, 'day').startOf('day').valueOf();
    } else {
      break;
    }
  }

  return streak;
};
