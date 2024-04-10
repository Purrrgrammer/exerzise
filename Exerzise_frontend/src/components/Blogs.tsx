import React from "react";

const Blogs = ({ data }) => {
  return (
    <div className="flex flex-col w-1/2 mx-auto gap-y-4 ">
      {data.map((el, index) => (
        <div className="flex flex-col p-8 bg-slate-200 gap-y-3 cursor-pointer hover:bg-slate-300">
          <b className="text-xl">{el.header}</b>
          <div>
            by {el.author} | {el.date} | {el.category}
          </div>
          <div>{el.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
