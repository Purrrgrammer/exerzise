import { BlogProps } from "../interfaces";

const Blogs = ({ data }: BlogProps) => {
  return (
    <div className="flex flex-col w-1/2 mx-auto gap-y-4 ">
      {data.map((el, index: number) => (
        <div
          className="flex flex-col p-8 bg-slate-200 gap-y-3 cursor-pointer hover:bg-slate-300"
          key={index}
        >
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
