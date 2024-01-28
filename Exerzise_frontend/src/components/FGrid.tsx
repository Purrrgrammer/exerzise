import React from "react";

const FGrid = () => {
  const gridContent = [
    {
      name: "asdf",
      header: "asdf",
      content: "asdfsdaf",
      bg: "https://wallpapers.com/images/hd/gym-background-1vfxu206kqpygj3p.jpg",
    },
    {
      name: "asdf",
      header: "asdf",
      content: "asdfsdaf",
      bg: "https://wallpapers.com/images/hd/gym-background-1vfxu206kqpygj3p.jpg",
    },
    {
      name: "asdf",
      header: "asdf",
      content: "asdfsdaf",
      bg: "https://wallpapers.com/images/hd/gym-background-1vfxu206kqpygj3p.jpg",
    },
    {
      name: "asdf",
      header: "asdf",
      content: "asdfsdaf",
      bg: "https://wallpapers.com/images/hd/gym-background-1vfxu206kqpygj3p.jpg",
    },
  ];
  return (
    <div className="body2 grid grid-cols-4 ">
      {gridContent.map((el, index) => (
        <div key={index} className="grid grid-rows-2 ">
          <div className={`grid-text ${index % 2 === 0 && "order-last"} `}>
            <div>{el.header}</div>
            <div>{el.content}</div>
          </div>
          <div className="img-container">
            <img
              className="img h-[300px] w-[300px]"
              src="https://wallpapers.com/images/hd/gym-background-1vfxu206kqpygj3p.jpg"
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FGrid;
