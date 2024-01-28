export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const createTimeTable = () => {
  const timeRange = [];

  const formatting = (number) => {
    if (number < 10) {
      return `0${number}:00 - 0${number + 1}:00`;
    }
    return `${number}:00 - ${number + 1 === 24 ? "00" : number + 1}:00`;
  };
  for (let i = 0; i <= 24; i++) {
    timeRange.push({ time: formatting(i) });
  }
  return timeRange.slice(0, timeRange.length - 1);
};
// 00:00 AM - 01:00 PM

// let dayStart = 15;
// let dayEnd = dayStart + 7;
// const weekStart = new Date(`2023,1,${dayStart}`);
// const weekEnd = new Date(`2023,1,${dayEnd}`);
// console.log(weekStart);
// console.log(weekEnd);
