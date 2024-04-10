import { toast } from "react-toastify";
import { dayNames } from "../base";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

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
  return currentDate;
};


export const removeObjectValueDupe = (arr, key) => {
  // key
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const findLocalUser = (user: string, globalUser: any) => {
  if (
    localStorage.getItem(user) &&
    JSON.parse(localStorage.getItem(user)!) !== undefined
  ) {
    return JSON.parse(localStorage.getItem(user)!);
  } else {
    return globalUser;
  }
};

//filter seearch

export const filterSearch = (target, str, session) => {
  if (target !== undefined) {
    return target.filter((item) => {
      const fullName =
        item.firstname.toLowerCase() + " " + item.lastname.toLowerCase();
      if (fullName.includes(str.toLowerCase())) {
        // console.log("items", item);
        // console.log("session", session);
        if (session === "all") {
          return item;
        } else {
          return item.session === session;
        }
      }
    });
  }
};
