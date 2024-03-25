import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlertBox = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={!false}
      rtl={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default AlertBox;
