import React from "react";

const Bars = () => {
  const content = [
    {
      name: "workout",
      content:
        "Ipsum nostrud nostrud anim aliqua ad consectetur nulla quis. Deserunt mollit est ea sint reprehenderit eiusmod amet est deserunt eu anim labore consequat minim. Laborum aliqua incididunt est enim laboris irure eu qui et ut sit consequat est. Tempor adipisicing proident enim officia cupidatat ipsum. Officia amet reprehenderit amet excepteur tempor commodo.",
      icon: "https://static.thenounproject.com/png/2397485-200.png",
    },
    {
      name: "workout",
      content:
        "Ipsum nostrud nostrud anim aliqua ad consectetur nulla quis. Deserunt mollit est ea sint reprehenderit eiusmod amet est deserunt eu anim labore consequat minim. Laborum aliqua incididunt est enim laboris irure eu qui et ut sit consequat est. Tempor adipisicing proident enim officia cupidatat ipsum. Officia amet reprehenderit amet excepteur tempor commodo.",
      icon: "https://static.thenounproject.com/png/2397485-200.png",
    },
    {
      name: "workout",
      content:
        "Ipsum nostrud nostrud anim aliqua ad consectetur nulla quis. Deserunt mollit est ea sint reprehenderit eiusmod amet est deserunt eu anim labore consequat minim. Laborum aliqua incididunt est enim laboris irure eu qui et ut sit consequat est. Tempor adipisicing proident enim officia cupidatat ipsum. Officia amet reprehenderit amet excepteur tempor commodo.",
      icon: "https://static.thenounproject.com/png/2397485-200.png",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row justify-center stack static ">
      {/* md:absolute */}
      {content.map((el, index) => (
        <div
          className="bar h-[300px] w-[400px] p-5 my-5 flex flex-col justify-center items-center mx-10 "
          key={index}
        >
          <img className="h-20 w-20" src={el.icon} alt={el.name} />
          <div key={index} className="rounded-md">
            <h1 className="text-header">{el.name}</h1>
          </div>
          {el.content}
        </div>
      ))}
    </div>
  );
};

export default Bars;
