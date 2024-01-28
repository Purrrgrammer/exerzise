import React from "react";
import Navbar from "../components/Navbar";
import CoachCard from "../components/CoachCard";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import { useGetAllCoachesQuery } from "../features/api/apiSlice";

const CoachPage = () => {
  const { data, error, isLoading } = useGetAllCoachesQuery(null);
  console.log(data);

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
    {
      coachId: "2",
      firstname: "John",
      lastname: "doe",
      bio: "fasdfasdfads",
      image: "",
      bg: "https://as2.ftcdn.net/v2/jpg/01/03/88/65/1000_F_103886569_ytWItMqrlRWbIEcSrhPyk1IkGqEG7I8w.jpg",
    },
    {
      coachId: "3",
      firstname: "John",
      lastname: "doe",
      bio: "asdfasdfasdfasd",
      image: "",
      bg: "https://as2.ftcdn.net/v2/jpg/01/03/88/65/1000_F_103886569_ytWItMqrlRWbIEcSrhPyk1IkGqEG7I8w.jpg",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex items-center w-[50%] mx-auto">
        Search
        <input
          type="text"
          placeholder="a coach name..."
          className="w-full p-2 m-4 "
        />
      </div>
      <FilterBar />
      <div className="grid grid-cols-4 gap-2 content-center items-center">
        <CoachCard coachData={data !== undefined ? data : coachData} />
        {/* <Pagination /> */}
      </div>
      <Footer />
    </>
  );
};

export default CoachPage;
