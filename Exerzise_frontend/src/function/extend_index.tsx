// Response form bookingTime where date = 22/12/2024 and userId = xx
let bookingTime = [
  {
    start: "16:00",
    typeTime: 30,
  },
  {
    start: "23:00",
    typeTime: 30,
  },
];

// Response form coachingTime where Day = 6 and userId = xx
let timeRanges = [
  {
    date: 6,
    start: "16:00",
    end: "20:00",
  },
  {
    date: 6,
    start: "22:00",
    end: "24:00",
  },
];

export function generateTimeIntervals(timeRanges, typeTime) {
  let result = [];

  timeRanges.forEach((range) => {
    let startTime = parseTime(range.start);
    let endTime = parseTime(range.end);
    while (startTime < endTime) {
      result.push(formatTime(startTime));
      startTime = new Date(startTime.getTime() + typeTime * 60000); // add typeTime minutes
    }
  });
  return result;
}

export function removeBookingTimes(timeIntervals, bookingTime) {
  let bookingTimes = [];

  bookingTime.forEach((booking) => {
    let startTime = parseTime(booking.start);
    let endTime = new Date(startTime.getTime() + booking.typeTime * 60000);

    while (startTime < endTime) {
      bookingTimes.push(formatTime(startTime));
      startTime = new Date(startTime.getTime() + 30 * 60000); // Use 30 minutes interval to cover overlaps
    }
  });

  return timeIntervals.filter((time) => !bookingTimes.includes(time));
}

// Helper functions
function parseTime(timeStr) {
  let [hours, minutes] = timeStr.split(":").map(Number);
  let date = new Date();
  date.setHours(hours, minutes, 0, 0); // set hours and minutes, reset seconds and milliseconds
  return date;
}

function formatTime(date) {
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// create all free time by 30 minutes
let generatedIntervals = generateTimeIntervals(timeRanges, 30); // 30 or 60;
console.log("generatedIntervals", generatedIntervals);

// create all free is time and filter by booking Time
let availableIntervals = removeBookingTimes(generatedIntervals, bookingTime);
console.log("availableIntervals", availableIntervals);
