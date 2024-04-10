import Navbar from "../components/Navbar";
import Booking from "../components/Booking";
import Footer from "../components/Footer";
import AlertBox from "../components/AlertBox";

const Schedule = () => {
  return (
    <>
      <Navbar />
      <div className="my-10">
        <Booking />
        <AlertBox />
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
