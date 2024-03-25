import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CoachCard from "../components/CoachCard";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import { useGetAllCoachesQuery } from "../features/api/apiSlice";

const CoachPage = () => {
  const [filterState, setFilterState] = useState("all");
  const { data, error, isLoading } = useGetAllCoachesQuery(null);
  const [displayData, setDisplayData] = useState(data);

  console.log(`fetched data`, data);

  useEffect(() => {
    if (filterState === "all") {
      setDisplayData(data);
    } else {
      const filtered = data.filter((el) => el.session === filterState);
      setDisplayData(filtered);
    }
    console.log(`filterState`, filterState);
  }, [data, filterState]);

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

      {isLoading ? (
        "loaging"
      ) : (
        <>
          <FilterBar
            filterState={filterState}
            setFilterState={setFilterState}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-10 place-items-center">
            {isLoading ? "loading...." : <CoachCard coachData={displayData} />}
            {/* <Pagination /> */}
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default CoachPage;

// const defaultData = [
//   {
//     coachId: "1",
//     firstname: "John",
//     lastname: "doe",
//     bio: "asdfdasgsdgfsdaf",
//     image: "",
//     bg: "https://as2.ftcdn.net/v2/jpg/01/03/88/65/1000_F_103886569_ytWItMqrlRWbIEcSrhPyk1IkGqEG7I8w.jpg",
//     session: "basketball",
//   },
//   {
//     coachId: "2",
//     firstname: "John",
//     lastname: "doe",
//     bio: "fasdfasdfads",
//     image: "",
//     bg: "https://as2.ftcdn.net/v2/jpg/01/03/88/65/1000_F_103886569_ytWItMqrlRWbIEcSrhPyk1IkGqEG7I8w.jpg",
//   },
//   {
//     coachId: "3",
//     firstname: "John",
//     lastname: "doe",
//     bio: "asdfasdfasdfasd",
//     image: "",
//     bg: "https://as2.ftcdn.net/v2/jpg/01/03/88/65/1000_F_103886569_ytWItMqrlRWbIEcSrhPyk1IkGqEG7I8w.jpg",
//   },
// ];
