import React from "react";
import Popup from "reactjs-popup";
import { useUpdateBookingMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";

const StatusPopup = ({ showStatus, setShowStatus, status, bookingId }) => {
  const [
    updateBooking,
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateBookingMutation();
  return (
    <Popup
      modal
      nested
      trigger={
        <button className="p-3 mx-2 bg-red-200 hover:bg-white transition duration-500 text-nowrap	">
          {status}
        </button>
      }
    >
      {(close) => (
        <div className="p-5">
          are you sure you want to set this booking ({bookingId}) as{" "}
          <u>{status}</u>
          <div className="flex gap-x-2">
            <button
              className="bg-red-200 p-2 close button"
              onClick={() => {
                updateBooking({ bookingId: bookingId, status: status })
                  .unwrap()
                  .then((response) => {
                    const resolveAfter3Sec = new Promise((resolve) => {
                      setTimeout(resolve, 3000); //get true from responseData.success
                    });
                    toast.promise(resolveAfter3Sec, {
                      pending: "We are updating booking status, please wait",
                      success: response.message,
                      error: "the update has been rejected 🤯",
                    });
                  })
                  .catch((err) => {
                    toast.error(err.data.message);
                  });
              }}
            >
              yes
            </button>
            <button className="bg-red-200 p-2 close button" onClick={close}>
              no
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default StatusPopup;
