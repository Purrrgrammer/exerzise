import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dayNames } from "../base";
import { useEffect, useState } from "react";
import { categorize } from "../function";
import CommonBtn from "../components/CommonBtn";
import TimePickerValue from "../components/TimePicker";
import DayPicker from "../components/dayPicker";
import dayjs from "dayjs";
import List from "../components/List";
import Booking from "../components/Booking";

interface timeSelectedType {
  date?: string;
  day: string;
  timeStart: string;
  timeEnd: string;
}

const CoachSchedule = () => {
  const [dayAdded, setDayAdded] = useState(0);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const datedate = dayjs().add(dayAdded, "day").format("DD/MM/YYYY");
  const [timeSelected, setTimeSelected] = useState<timeSelectedType[]>([]);
  const [timeStart, setTimeStart] = useState<any>();
  const [timeEnd, setTimeEnd] = useState<any>();
  useEffect(() => {
    console.log("timeStart", timeStart);
    console.log("timeEnd", timeEnd);
  }, [timeStart, timeEnd]);

  const timeSelectHandler = (timeS: string, timeE: string) => {
    setTimeSelected((prev) => [
      ...prev,
      {
        day: dayNames[currentDay],
        timeStart: timeS,
        timeEnd: timeE,
        date: datedate,
      },
    ]);
    console.log(categorize(timeSelected)); //post this in api
  };

  return (
    <>
      <Navbar />
      <DayPicker
        datedate={datedate}
        currentDay={currentDay}
        setDayAdded={setDayAdded}
        setCurrentDay={setCurrentDay}
      />
      <div className="grid grid-cols-3 gap-2 w-1/5 mx-auto place-content-center justify-items-center	"></div>
      <div className="flex gap-x-4 justify-center items-center">
        <TimePickerValue
          label={"Start Time"}
          val={timeStart}
          setVal={setTimeStart}
        />
        <div>-</div>
        <TimePickerValue label={"End Time"} val={timeEnd} setVal={setTimeEnd} />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-3 mx-7 ">
        {categorize(timeSelected).map((el, index) => (
          <div
            key={index}
            className="bg-red-200 p-4 flex flex-col items-center"
          >
            <div className="flex gap-x-1">
              <div className="">{el.day}</div>
              <div className="">{el.date}</div>
            </div>
            <div className="">
              {el.timeStart} - {el.timeEnd}
            </div>
          </div>
        ))}
      </div>
      {
        <CommonBtn
          placeholder={"submit"}
          onClick={() => {
            timeSelectHandler(timeStart, timeEnd);
          }}
        />
      }
      <Footer />
    </>
  );
};

export default CoachSchedule;
