import { dayNames } from "../base";
import { CoachTimeContainerPropType } from "../interfaces/propTypes";

export const CoachTimeContainer = ({
  data,
  header,
  fn,
  setTimeSelected,
}: CoachTimeContainerPropType) => (
  <>
    <div className="m-5 w-full text-center">{header}</div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 mx-7 ">
      {data.map((val, index: number) => (
        <div
          key={index}
          className="bg-red-200 p-4 flex flex-col items-center relative"
        >
          <div className="flex gap-x-1 ">
            <div className="">{dayNames[val.day]}</div>
            <div className="">{val.date}</div>
          </div>
          <div className="">
            {val.availableTime}-{val.endofAvailableTime}
          </div>
          {/* delete butn */}
          <button
            onClick={() => {
              const result = data.filter((el) => el.day !== val.day);
              setTimeSelected(result);
              fn();
            }}
            className="absolute text-white top-0 right-2 hover:text-slate-300"
          >
            x
          </button>
        </div>
      ))}
    </div>
  </>
);

export default CoachTimeContainer;
