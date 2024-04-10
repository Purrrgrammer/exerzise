import React from "react";

const FGrid = () => {
  const gridContent = [
    {
      name: "asdf",
      header: "get in shape",
      content:
        "Excepteur amet ut ea laborum non amet sint elit. Excepteur velit esse cupidatat laboris consectetur excepteur quis.",
      bg: "https://wallpapers.com/images/hd/gym-background-1vfxu206kqpygj3p.jpg",
    },
    {
      name: "asdf",
      header: "stronger",
      content: "Dolore Lorem est in voluptate ex Lorem.",
      bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1-dQIIWS9w4h2yucuYfMVVEBSz8H7bX11h5rdTriBA&s",
    },
    {
      name: "asdf",
      header: "sunt",
      content:
        "Deserunt eu nulla occaecat ipsum cillum pariatur consectetur labore.",
      bg: "https://media.istockphoto.com/id/638813420/photo/punching-bag-boxer.jpg?s=612x612&w=0&k=20&c=NWszPLliVbFVFJ50wg1RwNjxnJTjqpqzMifUO1Zn2Eo=",
    },
    {
      name: "asdf",
      header: "quod",
      content: "Esse commodo ipsum nisi velit elit labore.",
      bg: "https://media.istockphoto.com/id/463946411/photo/b-w-runner.jpg?s=612x612&w=0&k=20&c=EXBCu8PXHGPUfEgJ7m6T-hRRVMw5TZFwojIRK7AffGg=",
    },
  ];
  return (
    <div className="grid grid-cols-4 ">
      {gridContent.map((el, index) => (
        <div key={index} className="grid grid-rows-2 h-[500px]">
          <div className={`grid-text ${index % 2 === 0 && "order-last"}`}>
            <div className="text-2xl">{el.header}</div>
            <div>{el.content}</div>
          </div>
          <div className="img-container">
            <img className="cover h-full" src={el.bg} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FGrid;
