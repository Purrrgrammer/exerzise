import { dayNames } from "../base";

export const getInitialFormObjects = (formArr: any) => {
  //get initail value
  let initial = formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
  if (Object.keys(initial).length > 3) {
    initial["role"] = "user";
  }
  return initial;
};

export const removeDupe = (arr) => {
  // const uniqueObjects = [
  //   ...new Map(arr.map((item) => [item.time, item])).values(),
  // ];
  const sortDays = (a, b) => {
    a = dayNames.indexOf(a);
    b = dayNames.indexOf(b);
    return a < b ? 0 : 1;
  };

  // XXXX
  const sorted_test = arr.sort((a, b) => {
    return a.time - b.time || sortDays(a, b);
  });
  console.log("sorted_test", sorted_test);

  // XXXX

  // console.log("unique", unique);
  // const sorted = uniqueObjects.sort((a, b) => a.value - b.value);

  // return unique;
};

export const categorize = (arr) => {
  const result = Object.groupBy(arr, ({ day }) => day);

  var renew = Object.keys(result).map((key) => [result[key]]);
  const makeTime = (arr) => {
    return [...new Map(arr.map((item) => [item.time, item])).values()].sort(
      (a, b) => a.value - b.value
    );
  };
  const newResult = renew.map((el) => makeTime(el[0]));
  return newResult.flat();
};

export const getDateinWeeks = (param) => {
  const today = new Date();

  let dateday = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let day = today.getDay();
  let currentDate = `${dayNames[day]} ${dateday}/${month}/${year}`;
  // if (param === "L") {
  //   day - 1;
  //   return currentDate;
  // }
  // if (param === "R") {
  //   day + 1;
  //   return currentDate;
  // }
  // if (param === "X") {
  // }
  return currentDate;
  console.log(currentDate); // "17-6-2022"
};

// const today = new Date();
// const tomorrow = new Date(today);
// let dynamicDay = new Date(today);
// dynamicDay = tomorrow;
// const ThisDay = dayNames.find(
//   (el) => dayNames.indexOf(el) === dynamicDay.getDay()
// );

// const [newTimeSelected, setNewTimeSelected] = useState(tomorrow);



// Generate Time


