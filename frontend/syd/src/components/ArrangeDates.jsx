function filterByDateRange(objects, startDate, endDate) {
  return objects.filter(obj => {
    const taskDate = new Date(obj.taskDate); // Convert taskDate to Date object
    return taskDate >= startDate && taskDate <= endDate;
  });
}

// Specific functions for day, week, month, and year
export function filterByDay(objects, targetDate) {
  const startDate = new Date(targetDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(targetDate);
  endDate.setHours(23, 59, 59, 999);

  return filterByDateRange(objects, startDate, endDate);
}

export function filterByWeek(objects, targetDate) {
  const startDate = new Date(targetDate);
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return filterByDateRange(objects, startDate, endDate);
}

export function filterByMonth(objects, targetDate) {
  const startDate = new Date(targetDate);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  endDate.setDate(0);
  endDate.setHours(23, 59, 59, 999);

  return filterByDateRange(objects, startDate, endDate);
}

export function filterByYear(objects, targetDate) {
  const startDate = new Date(targetDate);
  startDate.setMonth(0, 1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(targetDate);
  endDate.setMonth(11, 31);
  endDate.setHours(23, 59, 59, 999);

  return filterByDateRange(objects, startDate, endDate);
}