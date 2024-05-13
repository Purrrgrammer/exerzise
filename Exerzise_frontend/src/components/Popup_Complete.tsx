import Rating from "@mui/material/Rating";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { ReactPopupType } from "../interfaces/propTypes";

const CompleteBookingPopup = (props: ReactPopupType) => {
  const {
    refetch,
    show,
    setShow,
    starValue,
    setStarValue,
    thisBooking,
    // bookingId,
    commentText,
    setCommentText,
    updateComment,
  } = props;

  return (
    <Popup closeOnDocumentClick open={show}>
      <div
        className={`flex flex-col items-center
        feedback p-4 py-0 h-[200px] bg-red-200 transition duration-500 ${
          show ? "" : ""
        } `}
      >
        <div className="flex justify-between w-full m-4">
          <Rating
            name="simple-controlled"
            value={starValue}
            onChange={(_, newValue) => {
              setStarValue(newValue as number);
            }}
            defaultValue={2.5}
            precision={0.5}
            className="my-1"
          />
          <div>{thisBooking}</div>
          <button
            type="button"
            className="bg-white p-2 close button"
            onClick={() => {
              updateComment({
                bookingId: thisBooking,
                data: { comment: commentText, rating: starValue },
              })
                .unwrap()
                .then((res: { message: string }) => {
                  toast.success(res.message);
                })
                .then(() => {
                  setShow(false);
                  refetch();
                });
              // console.log({
              //   comment: commentText,
              //   rating: starValue,
              // });
              //closeModal();
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
  );
};

export default CompleteBookingPopup;
