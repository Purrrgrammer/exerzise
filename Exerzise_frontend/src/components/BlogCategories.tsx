import React from "react";

const BlogCategories = ({ categories }) => {
  return (
    <div className="flex flex-col items-center ">
      {Array.from(new Set(categories)).map((el) => (
        <div className="flex flex-col border-slate-300 border-b-2 p-3 w-3/4 hover:bg-slate-300 cursor-pointer">
          <div className="flex justify-around w-full">
            <div className="flex gap-x-2">
              <div>{el.category}</div>
              <div>{">>>"}</div>
            </div>
            <div>(count)</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCategories;
