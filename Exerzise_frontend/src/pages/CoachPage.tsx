import { ChangeEvent, useEffect, useState } from "react";
// import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import CoachCard from "../components/CoachCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import {
  selectAllCoaches,
  // selectCoachById,
  // selectCoachIds,
  useGetAllCoachesQuery,
} from "../features/api/userApiSlice";
import { filterSearch } from "../function";
import { SearchBar } from "../components/SearchBar";
import { useSelector } from "react-redux";
import { CoachDataType } from "../interfaces";

const CoachPage = () => {
  const { isSuccess, isLoading } = useGetAllCoachesQuery(null);
  const [filterState, setFilterState] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  // const data = useSelector(selectCoachIds);
  const allCoaches = useSelector(selectAllCoaches);
  const [displayData, setDisplayData] = useState<
    CoachDataType[] | undefined | any
  >(allCoaches);

  console.log(allCoaches);

  useEffect(() => {
    setDisplayData(filterSearch(allCoaches, searchInput, filterState));
  }, [allCoaches, searchInput, filterState]);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchInput(value);
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
            {isSuccess &&
              displayData?.map((user: { userId: string }) => (
                <CoachCard key={user.userId} userId={user.userId} />
              ))}
            {/* <Pagination /> */}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default CoachPage;
