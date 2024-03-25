import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoachCard from "../components/CoachCard";
import {
  convertByTimeType,
  getOverlappingMinutes,
} from "../function/extend_index";
import DayPicker from "../components/dayPicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  useGetCoachQuery,
  useGetCoachSceduleByDayQuery,
  usePostBookingsMutation,
} from "../features/api/apiSlice";
import { removeObjectValueDupe } from "../function";
import CommonBtn from "../components/CommonBtn";
import { PriceRange, TimeRange, forUserBookingType } from "../interfaces";
import AlertBox from "../components/AlertBox";
import { toast } from "react-toastify";

const CoachDetail = () => {
  const defaultData = [
    {
      coachId: "999",
      firstname: "default",
      lastname: "default",
      bio: "defaultdefaultdefaultdefaultdefault",
      image: "",
      bg: "https://as2.ftcdn.net/v2/jpg/01/03/88/65/1000_F_103886569_ytWItMqrlRWbIEcSrhPyk1IkGqEG7I8w.jpg",
      session: "defaultdefaultdefaultdefault",
    },
  ];
  const [postBookings, bookingResult] = usePostBookingsMutation();

  const [dayAdded, setDayAdded] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const currentDate = dayjs().add(dayAdded, "day").format("L");
  // console.log("dayAdded", dayAdded); repeat
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const { coachId } = useParams<string>();
  const { data, error, isLoading } = useGetCoachQuery(coachId); //coach data
  // schedule
  const [userChose, setUserChose] = useState<forUserBookingType[]>([]);
  const {
    data: coachSceduleData,
    error: coachSceduleError,
    isLoading: coachSceduleLoading,
  } = useGetCoachSceduleByDayQuery({
    coachId: coachId,
    date: currentDate,
    // .format("L")
  });
  const [displayData, setDisplayData] = useState(
    coachSceduleData?.availableTime || defaultData
  );
  // console.log("coach detail data", data);

  useEffect(() => {
    if (coachSceduleData) {
      setDisplayData(coachSceduleData.availableTime);
    }
    setUserChose([]);
  }, [currentDay, coachSceduleData]);

  useEffect(() => {
    setDisplayData((prev) => {
      if (prev) {
        return prev.filter(
          (old: string) => !userChose.find((chosen) => old === chosen.timeFrom)
        );
      } else {
        return coachSceduleData;
      }
    });
  }, [userChose]); //why we need useEffect for this

  // create all free is time and filter by booking Time
  const confirmBookingHandler = () => {
    //problem is i cannot get promise response from the mutation
    if (userChose.length != 0) {
      const resolveAfter3Sec = new Promise((resolve) => {
        setTimeout(resolve, 3000); //get true from responseData.success
      });
      postBookings({
        bookings: userChose,
        coachId: coachId,
      })
        .unwrap()
        .then((fullfilled) => {
          toast.promise(resolveAfter3Sec, {
            pending: "We are booking, please wait",
            success: "Successfully booked👌",
            error: "the Booking(s) has been rejected 🤯",
          });
        })
        .catch((reject) => {
          toast.error(reject.data.message);
        });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
    } else toast.warn("there is emthy bookings");
  };

  const timeSelectHandler = (time: string) => {
    setUserChose((prev) => {
      const { session } = data[0];
      const { userId } = JSON.parse(localStorage.getItem("user")!);
      const newTimeSelected: forUserBookingType = {
        date: currentDate,
        day: currentDay,
        timeFrom: time,
        timeTo: convertByTimeType(time, 30),
        session: session, //joinable
        coachId: coachId,
        userId: userId,
        // price: coachInfo.price,
      };
      const result = [...prev, newTimeSelected];
      console.log("user chose", result);
      return removeObjectValueDupe(result, "timeFrom");
    });
    const timeArray = [
      ...userChose.map((time) => ({
        startTime: time.timeFrom,
        endTime: time.timeTo,
      })),
      {
        startTime: time,
        endTime: convertByTimeType(time, 30),
      },
    ];
    console.log("timeArray", timeArray);
    // for acculmulate price
    const priceRanges = coachSceduleData.data.map((time) => ({
      start: time.available_time,
      end: time.endofavailable_time,
      price: time.price,
    }));
    let total = 0;
    console.log("priceRanges", priceRanges);
    for (const timeRange of timeArray) {
      for (const priceRange of priceRanges) {
        const overlappingMinutes = getOverlappingMinutes(timeRange, priceRange);
        const overlappingHours = overlappingMinutes / 60;
        total += overlappingHours * priceRange.price;
      }
    }
    setTotalPrice(total);
  };

  return (
    <>
      <Navbar />
      <AlertBox />
      <div className="">{coachId}</div>

      <div className="flex justify-center">
        <CoachCard coachData={data ? data : defaultData} />
        <div>
          <DayPicker
            currentDate={currentDate}
            currentDay={currentDay}
            setDayAdded={setDayAdded}
            setCurrentDay={setCurrentDay}
          />
          <div className="grid grid-cols-7 gap-3 ">
            {/*newly filtered with chosen original */}
            {coachSceduleLoading
              ? "loading......"
              : displayData?.map(
                  (
                    time: string,
                    index: number //map time available from date
                  ) => (
                    <button
                      key={index}
                      className="bg-red-200 hover:bg-red-100 p-4"
                      onClick={() => {
                        timeSelectHandler(time);
                      }}
                    >
                      {`${time}-${convertByTimeType(time, 30)}`}
                    </button>
                  )
                )}
          </div>
          <div className="my-3">
            <div className="mb-2">User Bookings</div>
            {/*chosen original filter */}
            <div className="grid grid-cols-7 gap-3 ">
              {userChose!.map((selectedTime, index) => (
                <button
                  key={index}
                  className="bg-red-200 hover:bg-red-100 p-4"
                  onClick={() => {
                    setUserChose((prev) =>
                      prev.filter((item) => item !== selectedTime)
                    );
                    setDisplayData((prev) => [...prev, selectedTime.timeFrom]);
                  }}
                >
                  {`${selectedTime.timeFrom}-${selectedTime.timeTo}`}
                </button>
              ))}
            </div>
            <p>price: ${totalPrice}</p>
            <div className="flex gap-x-2 justify-center">
              <CommonBtn
                placeholder={"Confirm Bookings"}
                onClick={confirmBookingHandler}
              />
              <CommonBtn
                placeholder={"Clear Bookings"}
                onClick={() => {
                  setUserChose([]);
                  setDisplayData(coachSceduleData.availableTime);
                  toast.success("Cleared Bookings!");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoachDetail;
//error times clicked to chose
