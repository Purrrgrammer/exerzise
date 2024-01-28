import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoachCard from "../components/CoachCard";
import {
  generateTimeIntervals,
  removeBookingTimes,
} from "../function/extend_index";
import DayPicker from "../components/dayPicker";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetCoachQuery } from "../features/api/apiSlice";
const CoachDetail = () => {
  const { coachId } = useParams<string>();
  const { data, error, isLoading } = useGetCoachQuery(coachId);
  console.log("detail data", data);
  console.log("detail error", error);
  console.log("detail isloading", isLoading);

  const coachData = [
    {
      coachId: "1",
      firstname: "John",
      lastname: "doe",
      bio: "asdfdasgsdgfsdaf",
      image: "",
      bg: "https://as2.ftcdn.net/v2/jpg/01/03/88/65/1000_F_103886569_ytWItMqrlRWbIEcSrhPyk1IkGqEG7I8w.jpg",
      session: "basketball",
    },
  ];
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
  const [dayAdded, setDayAdded] = useState(0);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const datedate = dayjs().add(dayAdded, "day").format("DD/MM/YYYY");
  let generatedIntervals = generateTimeIntervals(timeRanges, 30); // 30 or 60;

  // create all free is time and filter by booking Time
  let availableIntervals = removeBookingTimes(generatedIntervals, bookingTime);
  console.log("generatedIntervals", generatedIntervals);
  console.log("availableIntervals", availableIntervals);

  return (
    <>
      <Navbar />
      <div className="">{coachId}</div>
      <div className="flex">
        <CoachCard
          coachData={data !== undefined ? data : coachData}
          isLoading={isLoading}
        />
        <div>
          <DayPicker
            datedate={datedate}
            currentDay={currentDay}
            setDayAdded={setDayAdded}
            setCurrentDay={setCurrentDay}
          />
          <div className="grid grid-cols-7 gap-3 ">
            {/*newly filtered with chosen original */}
            {availableIntervals.map(
              (
                time: string //map time available from date
              ) => (
                <button className="bg-red-200 hover:bg-red-100 p-4">
                  {time}
                </button>
              )
            )}
          </div>
          <div className="my-3">
            <div>Bookings</div>
            {/*chosen original */}
            <div>map List of available time fetched from</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoachDetail;
