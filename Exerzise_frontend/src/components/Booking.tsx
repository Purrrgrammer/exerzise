import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
  useUpdateCommentMutation,
} from "../features/api/apiSlice";
import { bookingDataResponse } from "../interfaces";

const Booking = () => {
  const [starValue, setStarValue] = useState<number | null>(3);
  const [commentText, setCommentText] = useState<string | null | undefined>(
    " "
  );
  const [
    updateBooking,
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateBookingMutation();
  const [
    updateComment,
    { isLoading: updating }, // This is the destructured mutation result
  ] = useUpdateCommentMutation();
  // useUpdateBookingMutation
  const { data, isLoading, error } = useGetBookingsQuery(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).userId
      : null
  );
  useEffect(() => {
    console.log("bookings data", data);
  }, []);

  const statusButton = ["cancel", "ongoing", "done"];
  const statusBackground = [
    { name: "cancel", color: "bg-red-500" },
    { name: "ongoing", color: "bg-yellow-200" },
    { name: "done", color: "bg-lime-400" },
  ];
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);

  const submitHandler = () => {
    //patch this booking to DB
    //clear/set this to default
  };

  return (
    // h-[600px] md:h-[600px] md:h-[600px]
    <div className="grid grid-cols-2 gap-3  h-full relative mx-4">
      {isLoading ? (
        "loading"
      ) : data?.length !== 0 ? (
        data?.map((el: bookingDataResponse, index: number) => (
          <div className="" key={index}>
            <div className="bg-red-200 relative p-4 object-cover overflow-hidden flex justify-center">
              <img
                className="hover:scale-150 md:hover:scale-125 transition duration-500 cursor-pointer "
                src={`${
                  el.coachImage
                    ? el.coachImage
                    : "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2023-06/nba-plain--e3aafb30-bbd5-43a5-bbb0-464f1433b74d.jpeg.webp"
                }`}
                alt="coachprofile"
              />
              <div className="absolute text-red-500 bottom-3 text-md md:text-3xl m-1 md:m-3">
                <div>
                  {el.coachFirstName} {el.coachLastName}
                </div>
                #{el.coachId}
              </div>
            </div>
            <div
              className="bg-slate-200 w-full p-4 flex flex-col items-start justify-between relative z-2 "
              key={index}
            >
              <div className="flex align-center w-full justify-around">
                <div
                  className={`self-end text-3xl p-3 ${
                    statusBackground.some(
                      (colo) => colo.name === el.coachStatus
                    )
                      ? statusBackground.find(
                          (colo) => colo.name === el.coachStatus
                        )?.color
                      : null
                  }`}
                >
                  <div>{el.coachStatus}</div>
                </div>
                <div
                  className={`self-end text-3xl p-3 ${
                    statusBackground.some((colo) => colo.name === el.userStatus)
                      ? statusBackground.find(
                          (colo) => colo.name === el.userStatus
                        )?.color
                      : null
                  }`}
                >
                  <div>{el.userStatus}</div>
                </div>
              </div>

              {/* content */}
              <div className="h-full mx-4 my-2">
                <div>Session: {el.session}</div>
                <div>Booking ID: {el.bookingId}</div>
                <div>Date: {el.date}</div>
                <div>
                  time: {el.timeFrom} - {el.timeTo}
                </div>
                <div>Coach Phone Number: {el.coachPhoneNumber}</div>
                {/* <div>Location:</div> */}
              </div>
              <div className="self-end text-2xl m-4">$ {el.price}</div>
              <div className="grid grid-cols-2 gap-y-1 md:flex items-center justify-center self-center">
                {statusButton.map((status, index) => (
                  <button
                    key={index}
                    className="p-3 mx-2 bg-red-200 hover:bg-white transition duration-500 text-nowrap	"
                    onClick={() => {
                      console.log(el.bookingId);

                      updateBooking({
                        bookingId: el.bookingId,
                        status: status,
                      });
                    }}
                  >
                    {status}
                  </button>
                ))}
                {/* popup btn */}
                <button
                  type="button"
                  className="button p-3 mx-2 hover:bg-white transition duration-500"
                  onClick={() => setShow((o) => !o)}
                >
                  Detail Popup
                </button>
                <Popup closeOnDocumentClick open={show}>
                  {/*  onClose={closeModal} */}
                  <div
                    className={`flex flex-col items-center feedback p-4 py-0 h-[200px] bg-red-200 transition duration-500 ${
                      show ? "" : ""
                    } `}
                  >
                    <div className="flex justify-between w-full m-4">
                      <Rating
                        name="simple-controlled"
                        value={starValue}
                        onChange={(_, newValue) => {
                          setStarValue(newValue);
                          console.log(starValue);
                        }}
                        defaultValue={2.5}
                        precision={0.5}
                        className="my-1"
                      />
                      <button
                        type="submit"
                        className="bg-white p-2 close button"
                        onClick={() => {
                          console.log(el.bookingId);
                          updateComment({
                            bookingIdd: el.bookingId,
                            data: { comment: commentText, rating: starValue },
                          });
                          console.log(starValue);
                          console.log(commentText);
                          closeModal();
                        }}
                      >
                        submit
                      </button>
                    </div>
                    <input
                      type="text"
                      className="w-full h-[100px] p-3"
                      onChange={(e) => {
                        setCommentText(e.target.value);
                      }}
                    />
                  </div>
                </Popup>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>please book or register/login</div>
      )}
    </div>
  );
};

export default Booking;
