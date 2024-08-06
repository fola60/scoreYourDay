function filterByDateRange(objects, startDate, endDate) {
  return objects.filter(obj => {
    const taskDate = new Date(obj.taskDate); // Convert taskDate to Date object
    return taskDate >= startDate && taskDate <= endDate;
  });
}

// Specific functions for day, week, month, and year
export function filterByDay(objects, targetDate) {
  console.log('targetDate' + targetDate);
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

export function daysLeftInWeek() {
  let today = new Date();
  let dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  let daysLeft = 6 - dayOfWeek;
  return daysLeft;
}

export function daysLeftInMonth() {
  let today = new Date();
  let currentDate = today.getDate();
  let totalDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  let daysLeft = totalDaysInMonth - currentDate;
  return daysLeft;
}

export function daysLeftInYear() {
  let today = new Date();
  let startOfYear = new Date(today.getFullYear(), 0, 1);
  let endOfYear = new Date(today.getFullYear() + 1, 0, 1);
  let daysPassed = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
  let totalDaysInYear = Math.floor((endOfYear - startOfYear) / (1000 * 60 * 60 * 24));
  let daysLeft = totalDaysInYear - daysPassed;
  return daysLeft;
}

export function convertNum(num,type) {

  if(type == 1) {
    if (0 <= num && num < 60) {
      return "F"
    } else if (60 <= num && num < 63) {
      return "D-"
    } else if (63 <= num && num < 67) {
      return "D"
    } else if (67 <= num && num < 70) {
      return "D+"
    } else if (70 <= num && num < 73) {
      return "C-"
    } else if (73 <= num && num < 77) {
      return "C"
    } else if (77 <= num && num < 80) {
      return "C+"
    } else if (80<= num && num < 83) {
      return "B-"
    } else if (83 <= num && num < 87) {
      return "B"
    } else if (87 <= num && num < 90) {
      return "B+"
    } else if (90 <= num && num < 93) {
      return "A-"
    } else if (93 <= num && num < 97) {
      return "A"
    } else if (97 <= num && num <= 100) {
      return "A+"
    } else {
      return "F"
    }
  } else if (type == 2) {
    if (num != undefined) {
      return `${num}%`;
    } else {
      return "0%"
    }
    
  } else if (type == 3) {
    if (0 <= num && num < 31 ) {
      return "H8"
    } else if(31 <= num && num < 40) {
      return "H7"
    } else if(40 <= num && num < 50) {
      return "H6"
    } else if(50 <= num && num < 60) {
      return "H5"
    } else if(60 <= num && num < 70) {
      return "H4"
    } else if(70 <= num && num < 80) {
      return "H3"
    } else if(80 <= num && num < 90) {
      return "H2"
    } else if(90 <= num && num <= 100) {
      return "H1"
    } else {
      return "H8"
    }
  } 

}