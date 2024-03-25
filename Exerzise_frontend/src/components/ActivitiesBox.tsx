import React, { useState } from "react";

export const ActivitiesBox = () => {
  const [act, setAct] = useState({
    name: "basketball",
    content: "asdfasdf",
    icon: "https://cdn-icons-png.flaticon.com/512/46/46106.png",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKYVAwe7kW3a3X88L6cX-Tt8K5HTnR83lhg&usqp=CAU",
  });

  const tabs = [
    {
      name: "basketball",
      content: "asdfasdf",
      icon: "https://cdn-icons-png.flaticon.com/512/46/46106.png",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKYVAwe7kW3a3X88L6cX-Tt8K5HTnR83lhg&usqp=CAU",
    },
    {
      name: "baseball",
      content:
        "Quis consequat non ex sint dolore minim quis est eiusmod. Anim pariatur qui voluptate adipisicing nisi et ad mollit consequat. Nostrud consectetur occaecat excepteur ipsum labore duis nisi dolor sunt eiusmod nisi non quis. Sit pariatur sint nisi et qui cillum laborum reprehenderit.",
      icon: "https://cdn-icons-png.flaticon.com/512/46/46106.png",
      img: "data:image/jpeg;base64,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",
    },
    {
      name: "fitness",
      content: "asdfasdf",
      icon: "https://cdn-icons-png.flaticon.com/512/46/46106.png",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKYVAwe7kW3a3X88L6cX-Tt8K5HTnR83lhg&usqp=CAU",
    },
    {
      name: "soccer",
      content: "asdfasdf",
      icon: "https://cdn-icons-png.flaticon.com/512/46/46106.png",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKYVAwe7kW3a3X88L6cX-Tt8K5HTnR83lhg&usqp=CAU",
    },
    {
      name: "football",
      content: "asdfasdf",
      icon: "https://cdn-icons-png.flaticon.com/512/46/46106.png",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKYVAwe7kW3a3X88L6cX-Tt8K5HTnR83lhg&usqp=CAU",
    },
  ];
  return (
    <div className="flex flex-col mx-auto md:flex-row justify-center m-20 h-[800px] md:h-[400px] w-[350px] md:w-[1000px]">
      <div className="w-full bg-slate-200 text-center p-4 relative z-3">
        <div className="tabs-container absolute flex justify-around gap-x-1 top-[-30px] left-[12%] md:top-0 md:flex-col md:left-[-30px] md:h-[400px] ">
          {tabs.map((el, index) => (
            <div
              onClick={() => {
                setAct(el);
              }}
              key={index}
              className={`tab cursor-pointer flex items-start md:items-center h-[80px] w-[50px] hover:-translate-y-3 md:h-[50px] md:w-[100px] md:hover:-translate-x-12 md:hover:-translate-y-0 ${
                el.name === act.name ? "bg-green-100" : "bg-slate-100"
              }`}
            >
              <img
                src={el.icon}
                alt=""
                className="h-[20px] mt-3 mx-4 md:mt-0"
              />
            </div>
          ))}
        </div>
        <div className="w-full h-full bg-red-200 p-4 relative">
          <header className="text-xl">{act.name}</header>
          <div className="h-[200px] md:h-5/6 md:mt-4 bg-slate-200 overflow-hidden ">
            <img
              className="w-full object-cover hover:scale-125 transition duration-500 cursor-pointer"
              src={act.img}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-red-200 text-center relative">
        <header className="p-4 md:p-10">{act.content}</header>
      </div>
    </div>
  );
};
