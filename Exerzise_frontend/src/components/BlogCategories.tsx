import { BlogType } from "../interfaces";

type categoriestProp = {
  categories: BlogType[];
};
const BlogCategories = ({ categories }: categoriestProp) => {
  return (
    <div className="flex flex-col items-center ">
      {Array.from(new Set(categories)).map((el, index) => (
        <div
          key={index}
          className="flex flex-col border-slate-300 border-b-2 p-3 w-3/4 hover:bg-slate-300 cursor-pointer"
        >
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
