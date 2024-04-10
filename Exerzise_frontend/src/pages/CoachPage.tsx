import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import CoachCard from "../components/CoachCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import { useGetAllCoachesQuery } from "../features/api/apiSlice";
import { filterSearch } from "../function";
import { SearchBar } from "../components/SearchBar";

const CoachPage = () => {
  const { data, error, isLoading } = useGetAllCoachesQuery(null);
  const [filterState, setFilterState] = useState("all");
  const [displayData, setDisplayData] = useState(data);
  const [searchInput, setSearchInput] = useState(" ");

  useEffect(() => {
    setDisplayData(filterSearch(data, searchInput, filterState));
  }, [data, searchInput, filterState]);

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Navbar />
      <SearchBar placeholder="for coach name..." handler={searchHandler} />
      {isLoading ? (
        "loading"
      ) : (
        <>
          <FilterBar
            filterState={filterState}
            setFilterState={setFilterState}
          />
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-y-10 place-items-center mx-auto w-3/4 ">
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
