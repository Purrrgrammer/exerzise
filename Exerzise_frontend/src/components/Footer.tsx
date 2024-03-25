const Footer = () => {
  const links = [
    {
      name: "facebook",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
    },
    {
      name: "instagram",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png",
    },
    {
      name: "twitter",
      url: "https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg",
    },
    {
      name: "likedin",
      url: "https://cdn-icons-png.flaticon.com/256/174/174857.png",
    },
  ];

  const section = [
    { header: "home", links: [{ text: "services" }] },
    { header: "product", links: [{ text: "coach" }] },
    { header: "about us", links: [{ text: "number" }] },
    {
      header: "privacy & terms",
      links: [{ text: "term" }, { text: "privacy" }],
    },
  ];
  return (
    <div className="h-[300px] w-full bg-slate-500 mt-4 p-4 bottom-[0%] ">
      <div className="flex justify-center gap-x-10 m-8 ">
        <div className="flex flex-col gap-y-4 ">
          <h1 className="text-4xl">EXERZISE</h1>
          <div className="">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
            facilis, inventore facere dicta voluptatum.
          </div>
          <div className="flex gap-x-3">
            {links.map((el, index) => (
              <img
                key={index}
                src={el.url}
                className="h-8 cursor-pointer hover:scale-110 transition"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-x-10">
          {section.map((el, index) => (
            <div className="flex flex-col " key={index}>
              <div className="text-xl text-red-500 mb-2" key={index}>
                {el.header}
              </div>
              {el.links.map((el, index) => (
                <div
                  className="cursor-pointer hover:text-white transition"
                  key={index}
                >
                  {el.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
