import { dayNames } from "../base";

export const createTimeTable = () => {
  const timeRange = [];

  const formatting = (number: number) => {
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

import {
  BookingDataResponse,
  CoachDataType,
  ForUserBookingType,
  FormArrType,
  LoginFormValueType,
  TimeSelectedType,
  UserLoginResponse,
} from "../interfaces";

export const getInitialFormObjects = (
  formArr: LoginFormValueType[]
): FormArrType => {
  let initials = formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
  let result: FormArrType = initials;
  if (Object.keys(initials).length > 3) {
    // result.role = "user"; //assign to role
    result["role"] = "user"; //assign to role
  }

  return result;
};

// export const removeDupe = (arr) => {
//   const sortDays = (a, b) => {
//     a = dayNames.indexOf(a);
//     b = dayNames.indexOf(b);
//     return a < b ? 0 : 1;
//   };

//   // XXXX
//   const sorted_test = arr.sort((a, b) => {
//     return a.time - b.time || sortDays(a, b);
//   });
//   console.log("sorted_test", sorted_test);

//   // return unique;
// };

export const categorize = (
  arr: TimeSelectedType[]
): TimeSelectedType[] | any[] => {
  const result = (<any>Object).groupBy(arr, ({ day }: { day: number }) => day);
  console.log("result cate", result);

  var renew = Object.keys(result).map((key) => [result[key]]);
  console.log("renew", renew);

  const makeTime = (arr: any) => {
    return [
      ...new Map(
        arr.map((item: { time: string }) => [item.time, item])
      ).values(),
    ].sort((a: any, b: any) => a.value - b.value);
  };

  const newResult = renew.map((el) => {
    console.log("makeTime(el[0])", makeTime(el[0]));
    return makeTime(el[0]);
  });
  console.log("newResult", newResult);
  console.log("newResult.flat()", newResult.flat());

  return newResult.flat();
};

export const getDateinWeeks = () => {
  const today = new Date();
  let dateday = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let day = today.getDay();
  let currentDate = `${dayNames[day]} ${dateday}/${month}/${year}`;
  return currentDate;
};

export const removeObjectValueDupe = (
  arr: ForUserBookingType[],
  key: string
) => {
  // key
  return [...new Map(arr.map((item: any) => [item[key], item])).values()];
};

export const findLocalUser = (user: string, globalUser: UserLoginResponse) => {
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

export const filterSearch = (
  target: CoachDataType[] | undefined,
  str: string,
  session: string
) => {
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

export const getExpired = (
  inputbookingTime: string,
  el: BookingDataResponse,
  no: boolean
) => {
  const timeNow = new Date().getTime();
  const bookingTime = new Date(inputbookingTime).getTime();
  const timeDiff = bookingTime - timeNow;
  console.log(el);
  if (no === true) {
    if (el.userStatus !== "cancel" && el.coachStatus !== "cancel") {
      return el;
    }
  } else {
    return timeDiff <= 0 ? el : null;
  }
};
