import React from "react";
import { Link } from "react-router-dom";

const AddBtn = () => {
  return (
    <Link
      to={
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")!).role === "user"
          ? "/coach"
          : localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user")!).role === "coach"
          ? "/coach/schedule"
          : "/"
      }
      className=" hover:pointer cursor-pointer"
    >
      <div className="flex bg-red-300 p-2 w-[100px] items-center">
        <img
          className="h-[30px] hover:rotate-180 transition ease-in-out duration-700"
          src="https://e7.pngegg.com/pngimages/100/522/png-clipart-plus-plus.png"
          alt=""
        />
        <div className="ms-3">Add</div>
      </div>
    </Link>
  );
};

export default AddBtn;
