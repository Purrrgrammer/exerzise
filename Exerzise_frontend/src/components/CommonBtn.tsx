import { CommonBtnPropsType } from "../interfaces/propTypes";

export const CommonBtn = ({ placeholder, onClick }: CommonBtnPropsType) => {
  return (
    <button
      className="my-2 p-3 bg-slate-200 hover:bg-slate-100 max-w-[200px]"
      onClick={onClick}
    >
      {placeholder}
    </button>
  );
};

export default CommonBtn;
