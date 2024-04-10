import React from "react";

const Gallery = () => {
  const imageGallery = [
    //data
    {
      src: "https://www.ihrsa.org/uploads/Articles/Column-Width/Personal-Training_kettle-bell_column.jpg",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7n1I6g_nu6lTzOmUMoNBiaPPwkcTlyhbesRLXu8TKA&s",
    },
    {
      src: "https://d3pnpe87i1fkwu.cloudfront.net/wp-content/uploads/2021/04/819yDVlE8AL._AC_SL1500_.jpg",
    },
    {
      src: "https://www.dailynews.com/wp-content/uploads/2023/08/LDN-L-UCLA-FBC-0412-DC-5.jpg?w=525",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkAKAxb0GecETay6x_vyJE39-4WZrEZgFW3zcLS0yL2A&s",
    },
    {
      src: "https://www.fitsw.com/blog/wp-content/uploads/2021/07/Client-Overcome-Gym-Anxiety-scaled.jpeg",
    },
  ];
  return (
    <>
      <div className="container mx-auto px-10 ">
        {/* py-2 lg:px-32 lg:pt-24 */}
        <div className="flex flex-wrap -m-1  md:-m-2">
          <div className="flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2">
              <img
                src={imageGallery[0].src}
                alt=""
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
              />
            </div>
            <div className=" w-1/2 p-1 md:p-2">
              <img
                src={imageGallery[1].src}
                alt=""
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
              />
            </div>
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[2].src}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[3].src}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[4].src}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[5].src}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
