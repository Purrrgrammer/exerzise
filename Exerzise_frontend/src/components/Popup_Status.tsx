// import React, { Dispatch, SetStateAction } from "react";
import Popup from "reactjs-popup";
import { useUpdateBookingMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";
import { StatusPopupPropsType } from "../interfaces/propTypes";
import { useState } from "react";
import { useAppSelector } from "../store";

const StatusPopup = ({ status, bookingId }: StatusPopupPropsType) => {
  const user = useAppSelector((state) => state.user);

  const [
    updateBooking,
    // { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateBookingMutation();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        className="p-3 mx-2 bg-red-200 hover:bg-white transition duration-500 text-nowrap	"
        onClick={() => setOpen((o) => !o)}
      >
        {status}
      </button>
      <Popup
        // modal
        // nested
        open={open}
        onClose={closeModal}
        closeOnDocumentClick
      >
        <div className="p-5">
          are you sure you want to set this booking ({bookingId}) as{" "}
          <u>{status}</u>
          <div className="flex gap-x-2">
            <button
              className="bg-red-200 p-2 close button"
              onClick={() => {
                updateBooking({
                  bookingId: bookingId,
                  status: status,
                  role: user.role,
                })
                  .unwrap()
                  .then((response) => {
                    const id = toast.loading("Updating Booking Status...");
                    toast.update(id, {
                      render: response.message,
                      type: "success",
                      isLoading: false,
                      autoClose: 2000,
                    });
                    // const resolveAfter3Sec = new Promise((resolve) => {
                    //   setTimeout(resolve, 3000); //get true from responseData.success
                    // });
                    // toast.promise(resolveAfter3Sec, {
                    //   pending: "We are updating booking tatus, Please Wait",
                    //   success: response.message,
                    //   error: "the update has been rejected 🤯",
                    // });
                    // refetch();
                  })
                  .catch((err) => {
                    toast.error(err.data.message);
                  });
              }}
            >
              yes
            </button>
            <button
              className="bg-red-200 p-2 close button"
              onClick={closeModal}
            >
              no
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default StatusPopup;
