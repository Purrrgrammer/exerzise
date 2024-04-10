import React, { MouseEventHandler, useState } from "react";

const Testomonials = () => {
  const carouselDirectionHandler = (direction: "+" | "-") => {
    if (direction === "+") {
      setVal((prev) => prev + 1);
      if (val >= testomonials.length - 1) {
        setVal(0);
      }
    }
    if (direction === "-") {
      setVal((prev) => prev - 1);
      if (val <= 0) {
        setVal(testomonials.length - 1);
      }
    }
  };
  const testomonials = [
    {
      user: "jackson jay1",
      role: "user",
      content:
        "Quis nisi enim reprehenderit sunt ex non consectetur nisi voluptate magna aute. Amet pariatur do veniam sit exercitation consequat occaecat elit sit ex. Mollit nulla cillum esse dolore minim adipisicing. Aute eiusmod deserunt sit sunt mollit voluptate labore tempor id consequat voluptate Lorem reprehenderit ullamco. ",
      userImage:
        "https://www.shareicon.net/data/2016/07/21/799353_user_512x512.png",
    },
    {
      user: "jackson jay2",
      role: "user2",
      content:
        "Aute ullamco adipisicing magna ullamco nostrud cupidatat aute ad eiusmod excepteur id fugiat.",
      userImage:
        "https://www.shareicon.net/data/2016/07/21/799323_user_512x512.png",
    },
    {
      user: "jackson jay3",
      role: "user3",
      content:
        "Amet pariatur do veniam sit exercitation consequat occaecat elit sit ex. Mollit nulla cillum esse dolore minim adipisicing. Aute eiusmod deserunt sit sunt mollit voluptate labore tempor id consequat voluptate Lorem reprehenderit ullamco. ",
      userImage:
        "https://www.shareicon.net/data/2016/07/21/799345_user_512x512.png",
    },
  ];
  const [val, setVal] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">Testomonials</h1>
      <div className="my-10 relative flex p-10 border-solid border-8 border-[#D8D8D8] bg-red-100 items-end h-[350px]">
        <img
          className="h-[350px] hidden md:block"
          src={testomonials[val].userImage}
        />

        {/* content box */}
        <div className="flex flex-col justify-between w-[400px] h-full bg-red-200 p-6">
          {/* <div>" "</div> */}
          <div className="h-full text-wrap break-words italic	">
            {testomonials[val].content}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="font-semibold">{testomonials[val].user}</div>
              <div className="font-normal">{testomonials[val].role}</div>
            </div>
            <div className="flex gap-x-3">
              <button
                className="py-2.5 px-3 bg-slate-200 hover:bg-slate-100"
                onClick={() => {
                  carouselDirectionHandler("-");
                }}
              >
                {"<"}
              </button>

              <button
                className="py-2.5 px-3 bg-slate-200 hover:bg-slate-100"
                onClick={() => {
                  carouselDirectionHandler("+");
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testomonials;
