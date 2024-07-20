export const getWeeks = (dates) => {
  const now = new Date();

  // Get start and end of the current week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  let newDates = [];
  for (let i = 0; i < dates.length; i++) {

    let date = new Date(dates[i].taskDate); // Convert taskDate to Date object
    if (date >= startOfWeek && date <= endOfWeek) {
      newDates.push(dates[i]);
    }
    
  }

  let val = JSON.stringify(newDates, null, 2)
  return val;
}

export const getMonths = (dates) => {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  let newDates = [];
  for (let i = 0; i < dates.length; i++) {
    let date = new Date(dates[i].taskDate); // Convert taskDate to Date object
    if (date >= startOfMonth && date <= endOfMonth) {
      newDates.push(dates[i]);
    }
  }
  let val = JSON.stringify(newDates, null, 2)
  return val;
}

export const getYears = (dates) => {
  const now = new Date();

  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31);

  let newDates = [];
  for (let i = 0; i < dates.length; i++) {
    let date = new Date(dates[i].taskDate); // Convert taskDate to Date object
    if (date >= startOfYear && date <= endOfYear) {
      newDates.push(dates[i]);
    }
  }

  let val = JSON.stringify(newDates, null, 2)
  return val;
}
