import { useState } from "react";
import Rating from "@mui/material/Rating";

type Listprops = {
  title?: string;
};
const Booking = ({ title }: Listprops) => {
  const [drop, setDrop] = useState(false);
  const exz = [
    {
      id: "",
      session: "",
      date: "",
      time: "",
      location: "",
      comment: "",
      rating: "",
      status: "",
    },
  ];

  const dropHandler = () => {
    console.log(drop);
    setDrop(!drop);
  };
  return (
    <div className="h-[600px] md:h-[600px] md:h-[600px]">
      <h1>{title}</h1>
      <div className="flex flex-col md:flex-row w-[400px] md:w-[1000px] h-[400px] relative bg-red-200 mx-auto ">
        {/* drop down */}
        <div
          className={`flex flex-col items-center feedback left-[10%] absolute w-[80%] p-4 py-0 h-[200px] bg-red-200 transition duration-500 ${
            drop ? "translate-y-[400px]" : ""
          } `}
        >
          <div className="flex justify-between w-full m-4">
            <Rating
              name="simple-controlled"
              defaultValue={2.5}
              precision={0.5}
              className="my-1"
            />
            <button type="submit" className="bg-white p-2">
              submit
            </button>
          </div>
          <textarea className="w-full h-[100px] p-3" />
        </div>
        <div className="bg-slate-200 w-full flex object-cover p-4 relative z-2 overflow-hidden">
          <img
            className="hover:scale-125 transition duration-500 cursor-pointer"
            src="https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2023-06/nba-plain--e3aafb30-bbd5-43a5-bbb0-464f1433b74d.jpeg.webp"
            alt=""
          />
          <div className="absolute c-name text-white bottom-4 m-3 text-3xl">
            Serberus Christian #12312
          </div>
        </div>
        <div className="bg-slate-200 w-full p-4 flex flex-col items-start justify-between relative z-2">
          <div className="self-end text-3xl p-3 bg-green-200">active</div>
          <div className="h-[300px]">
            <div>session: Basketball</div>
            <div>exz ID: 123124123</div>
            <div>date: 11/11/1111</div>
            <div>time: 12:00AM-13:00PM</div>
            <div>location: 123123123</div>
            <div>Coach Phone Number: +66 123 1231 123</div>
          </div>
          <div className="self-end text-2xl m-4">$ 123123</div>
          <div className="flex flex-col w-[300px] self-center">
            <div className="flex items-center justify-center ">
              <button className="p-3 mx-2 bg-red-200 hover:bg-white transition duration-500">
                non
              </button>
              <button className="p-3 mx-2 bg-red-200 hover:bg-white transition duration-500">
                non
              </button>
              <button className="p-3 mx-2 bg-red-200 hover:bg-white transition duration-500">
                non
              </button>
              <button
                className="p-3 mx-2 hover:bg-white transition duration-500"
                onClick={dropHandler}
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
