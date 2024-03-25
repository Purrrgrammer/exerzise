import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dayNames } from "../base";
import { useEffect, useState } from "react";
import { categorize } from "../function";
import CommonBtn from "../components/CommonBtn";
import TimePickerValue from "../components/TimePicker";
import DayPicker from "../components/dayPicker";
import dayjs from "dayjs";
import {
  useGetCoachTimeQuery,
  usePostScheduleMutation,
} from "../features/api/apiSlice";

interface timeSelectedType {
  date?: string;
  day: number;
  availableTime: string;
  endofAvailableTime: string;
}

const CoachSchedule = () => {
  const { data, isLoading, error } = useGetCoachTimeQuery(
    JSON.parse(localStorage.getItem("user")!).userId
  );
  console.log("coach time data", data);

  const [postSchedule] = usePostScheduleMutation();

  const [dayAdded, setDayAdded] = useState(0);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const currentDate = dayjs().add(dayAdded, "day").format("DD/MM/YYYY");
  const [timeSelected, setTimeSelected] = useState<timeSelectedType[] | any>(
    []
  );
  const [timeStart, setTimeStart] = useState<any>();
  const [timeEnd, setTimeEnd] = useState<any>();
  useEffect(() => {
    console.log("timeStart", timeStart);
    console.log("timeEnd", timeEnd);
  }, [timeStart, timeEnd]);

  const timeSelectHandler = (timeS: string, timeE: string) => {
    setTimeSelected((prev: timeSelectedType[]) => {
      let result = [
        ...prev,
        {
          day: currentDay,
          availableTime: timeS,
          endofAvailableTime: timeE,
          date: currentDate,
        },
      ];
      return categorize(result);
    });
    console.log(timeSelected); //post this in api
  };

  return (
    <>
      <Navbar />
      <DayPicker
        currentDate={currentDate}
        currentDay={currentDay}
        setDayAdded={setDayAdded}
        setCurrentDay={setCurrentDay}
      />
      <div className="grid grid-cols-3 gap-2 w-1/5 mx-auto place-content-center justify-items-center"></div>
      <div className="flex gap-x-4 justify-center items-center">
        <TimePickerValue
          label={"Start Time"}
          val={timeStart}
          setVal={setTimeStart}
        />
        <div>-</div>
        <TimePickerValue label={"End Time"} val={timeEnd} setVal={setTimeEnd} />
      </div>
      <div>Existed Time</div>
      {isLoading ? (
        "loading"
      ) : (
        <div className="grid grid-cols-5 gap-3 mt-3 mx-7 ">
          {data?.map((val, index: number) => (
            <div
              key={index}
              className="bg-red-200 p-4 flex flex-col items-center"
            >
              <div className="flex gap-x-1">
                <div className="">{dayNames[val.day]}</div>
                <div className="">{val.date}</div>
              </div>
              <div className="">
                {val.availableTime}-{val.endOfAvailableTime}
              </div>
            </div>
          ))}
        </div>
      )}
      <div>New Time</div>

      <div className="grid grid-cols-5 gap-3 mt-3 mx-7 ">
        {timeSelected.map((val, index: number) => (
          <div
            key={index}
            className="bg-red-200 p-4 flex flex-col items-center"
          >
            <div className="flex gap-x-1">
              <div className="">{dayNames[val.day]}</div>
              <div className="">{val.date}</div>
            </div>
            <div className="">
              {val.availableTime} - {val.endofAvailableTime}
            </div>
          </div>
        ))}
      </div>
      {/* submit btn */}
      <div className="flex justify-center gap-x-2">
        {
          <CommonBtn
            placeholder={"Set Time"}
            onClick={() => {
              timeSelectHandler(timeStart, timeEnd);
            }}
          />
        }
        {
          <CommonBtn
            placeholder={"submit"}
            onClick={() => {
              postSchedule({
                timeAvailable: timeSelected,
                coachId: JSON.parse(localStorage.getItem("user")!).userId,
              });
            }}
          />
        }
      </div>
      <Footer />
    </>
  );
};

export default CoachSchedule;
