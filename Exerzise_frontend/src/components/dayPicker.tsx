import React, { useState } from "react";
import { createTimeTable, dayNames } from "../base";
import { getDateinWeeks } from "../function";

const DayPicker = ({
  setCurrentDay,
  currentDay,
  setDayAdded,
  datedate,
}) => {
  let currentDate = (
    <div className="flex flex-col">
      <div>{`${dayNames[currentDay]}`}</div>
      <div>{datedate}</div>
      {/* <div>{`${dateDay}/${month}/${year}`}</div> */}
    </div>
  );

  const dayChangeHandler = (direction) => {
    if (direction === "L") {
      setCurrentDay((prev: number) => prev - 1);
      setDayAdded((prev: number) => prev - 1);
      if (currentDay <= 0) {
        setCurrentDay(dayNames.length - 1);
      }
    }
    if (direction === "R") {
      setCurrentDay((prev) => prev + 1);
      setDayAdded((prev) => prev + 1);
      // setDateDay(today.setDate(today.getDate() + 1));
      if (currentDay >= dayNames.length - 1) {
        setCurrentDay(0);
      }
    }
  };
  return (
    <div>
      <div className="flex justify-center my-4">
        <button
          className="px-3 bg-slate-200"
          onClick={() => {
            dayChangeHandler("L");
          }}
        >
          L
        </button>
        <div className="mx-2"> {currentDate}</div>
        <button
          className="px-3 bg-slate-200"
          onClick={() => {
            dayChangeHandler("R");
          }}
        >
          R
        </button>
      </div>
    </div>
  );
};

export default DayPicker;
