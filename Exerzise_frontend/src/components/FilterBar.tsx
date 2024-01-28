import { useState } from "react";

const FilterBar = () => {
  const [filterState, setFilterState] = useState("all");

  const exzType = [
    { name: "basketball" },
    { name: "fitness" },
    { name: "soccer" },
    { name: "fitness" },
    { name: "soccer" },
  ];
  // fetch here
  // filter by type
  return (
    <div className="flex flex-col items-center">
      <div className="filter-bar py-2 flex w-screen justify-center ">
        {exzType.map((el, index) => (
          <button
            onClick={() => {
              setFilterState(el.name);
            }}
            key={index}
            className="filter-btn p-3 px-6"
          >
            {el.name}
          </button>
        ))}
      </div>
      <div className="text-xl m-[30px]">{filterState}</div>
    </div>
  );
};

export default FilterBar;
