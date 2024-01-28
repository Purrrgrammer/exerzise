import Navbar from "../components/Navbar";
import List from "../components/List";
import Booking from "../components/Booking";
import Footer from "../components/Footer";

const Schedule = () => {
  return (
    <>
      <Navbar />
      <Booking title={"Ongoing"} />
      <List />
      <Footer />
    </>
  );
};

export default Schedule;
