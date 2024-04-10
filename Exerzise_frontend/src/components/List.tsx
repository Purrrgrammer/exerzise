import { useGetBookingsQuery } from "../features/api/apiSlice";
import { bookingDataResponse } from "../interfaces";

const List = () => {
  const header = [
    { name: "Coach" },
    { name: "Booking ID" },
    { name: "Date" },
    { name: "Status" },
    { name: "Price" },
  ];
  const {
    data: bookings,
    isLoading,
    error,
  } = useGetBookingsQuery({
    userId: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).userId
      : null,
    allDone: true,
  });
  console.log("bookings", bookings);

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="px-0 w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {header.map((el, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                >
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    {el.name}
                  </p>
                </th>
              ))}
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* line1 */}
            {isLoading
              ? "loading...."
              : bookings!.map(
                  (el: bookingDataResponse | any, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-200 cursor-pointer"
                      onClick={() => {
                        window.location.href = `schedule/${el.bookingId}`;
                      }}
                    >
                      {/* p-5 flex itmes-center justify-center */}
                      <td className="p-4 border-b border-blue-gray-50 ">
                        <div className="flex items-center gap-3">
                          <img
                            src={el.coachImage}
                            alt={el.coachId}
                            className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                            {el.coachName}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {el.bookingId}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          <div className="flex flex-col items-start ">
                            <div>{el.date}</div>
                            <div>{`${el.timeFrom}-${el.timeTo}`}</div>
                          </div>
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="w-max">
                          <div
                            className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md   ${
                              el.status === "pending"
                                ? "bg-amber-500/20 text-amber-900"
                                : el.status === "cancled"
                                ? "bg-red-500/20 text-red-900"
                                : el.status === "paid"
                                ? "bg-green-500/20 text-green-900"
                                : " "
                            }`}
                            style={{ opacity: 1 }}
                          >
                            <span className="">completed</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                            <img
                              src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                              alt="visa"
                              className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                              visa
                            </p>
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                              06/2026
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* button */}
                      {/* <td className="p-4 border-b border-blue-gray-50">
                  <button
                    onClick={() => {
                      alert(1);
                    }}
                    className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 "
                    type="button"
                  >
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </span>
                  </button>
                </td> */}
                    </tr>
                  )
                )}
            {/* line1 */}
          </tbody>
        </table>
        <div className="w-full pt-5 px-4 mb-8 mx-auto ">
          <div className="text-sm text-gray-700 py-1">
            fulfill your need of EXZ
            <a className="text-gray-700 font-semibold" href="" target="_blank">
              WV
            </a>{" "}
            by{" "}
            <a href="" className="text-gray-700 font-semibold" target="_blank">
              by EXZ team
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
