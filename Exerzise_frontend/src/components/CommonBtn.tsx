import React from "react";

export const CommonBtn = ({ placeholder, onClick }) => {
  return (
    <button
      className="my-2 p-3 bg-slate-200 w-100 hover:bg-slate-100"
      onClick={onClick}
    >
      {placeholder}
    </button>
  );
};

export default CommonBtn;
