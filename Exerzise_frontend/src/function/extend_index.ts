import { PriceRange, TimeRange } from "../interfaces";

type timeRangesType = {
  start: string;
  end: string;
  typeTime: number;
};
export function generateTimeIntervals(
  timeRanges: timeRangesType[],
  typeTime: number
) {
  let result: string[] = [];

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

export function removeBookingTimes(
  timeIntervals: string[],
  bookingTime: timeRangesType[]
) {
  let bookingTimes: string[] = [];

  bookingTime.forEach((booking) => {
    let startTime = parseTime(booking.start);
    let endTime = new Date(startTime.getTime() + booking.typeTime * 60000);

    while (startTime < endTime) {
      bookingTimes.push(formatTime(startTime));
      startTime = new Date(startTime.getTime() + 30 * 60000); // Use 30 minutes interval to cover overlaps
    }
  });

  return timeIntervals.filter((time: string) => !bookingTimes.includes(time));
}

// Helper functions
function parseTime(timeStr: string) {
  let [hours, minutes] = timeStr.split(":").map(Number);
  let date = new Date();
  date.setHours(hours, minutes, 0, 0); // set hours and minutes, reset seconds and milliseconds
  return date;
}

function formatTime(date: Date) {
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// create all free time by 30 minutes
// let generatedIntervals = generateTimeIntervals(timeRanges, 30); // 30 or 60;
// console.log("generatedIntervals", generatedIntervals);

// create all free is time and filter by booking Time
// let availableIntervals = removeBookingTimes(generatedIntervals, bookingTime);
// console.log("availableIntervals", availableIntervals);

export const convertByTimeType = (input: string, timeType: number) => {
  //convert to + 30 mins
  let front: string = input[0] + input[1];
  let back: string = input[3] + input[4];
  if (timeType === 30) {
    if (back === "00") {
      back = "30";
    } else {
      front = `${parseInt(front) + 1}`;
      back = "00";
    }
  }
  if (parseInt(front) === 24 || front === "24") {
    front = "00";
  }
  return `${front}:${back}`;
};

// helper funtion
//get price
export function parseTimePrice(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
export function getOverlappingMinutes(
  range1: TimeRange,
  range2: PriceRange
): number {
  // console.log(range1);
  // console.log(range2);
  const start1 = parseTimePrice(range1.startTime);
  const end1 = parseTimePrice(range1.endTime);
  const start2 = parseTimePrice(range2.start);
  const end2 = parseTimePrice(range2.end);
  const startMax = Math.max(start1, start2);
  const endMin = Math.min(end1, end2);
  // console.log(Math.max(0, endMin - startMax));

  return Math.max(0, endMin - startMax);
}
