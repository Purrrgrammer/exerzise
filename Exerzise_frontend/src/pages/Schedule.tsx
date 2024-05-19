import Navbar from "../components/Navbar";
import Booking from "../components/Booking";
import Footer from "../components/Footer";
import { useAppSelector } from "../store";
import { useState } from "react";

const Schedule = () => {
  const user = useAppSelector((state) => state.user);
  const schedulefilterbtn = ["Active", "Canceled", "Expired"];
  const [content, setContent] = useState("Active");
  let renderedcontent;
  switch (content) {
    case "Active":
      renderedcontent = (
        <div>
          {user.role === "user" ? (
            <h1 className="text-4xl text-center">Active: For User</h1>
          ) : user.role === "coach" ? (
            <h1 className="text-4xl text-center">Active: For Coach</h1>
          ) : null}
          <Booking />
        </div>
      );
      break;
    case "Canceled":
      renderedcontent = (
        <div>
          <h1 className="text-4xl text-center">Canceled</h1>
          <Booking cancel={true} />
        </div>
      );
      break;
    case "Expired":
      renderedcontent = (
        <div>
          {user.username !== "defaultusername" ? (
            <div>
              <h1 className="text-4xl text-center">Expired</h1>
              <Booking expired={true} />
            </div>
          ) : null}
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar />
      <div className="flex gap-x-1 mx-auto justify-center my-2 md:my-10">
        {schedulefilterbtn.map((btn) => (
          <button
            className="p-2 bg-slate-300 hover:bg-slate-200 transition ease-in-out duration-700"
            onClick={() => {
              setContent(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
      {renderedcontent}
      <Footer />
    </>
  );
};

export default Schedule;
