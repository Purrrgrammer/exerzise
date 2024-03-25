import { useSelector } from "react-redux";
import { JustAButton } from "../regular";
import { findLocalUser } from "../../function";

const SideBar = ({ setContent }) => {
  const globalUser = useSelector((state: any) => state.user);
  const user = findLocalUser("user", globalUser);
  const link = [{ name: "profile" }, { name: "history" }, { name: "favorite" }];
  return (
    <div className="h-screen w-[200px] bg-red-200 p-4 flex flex-col items-center">
      <div className="w-[100px] h-[100px] overflow-hidden rounded-full my-4 ">
        <img src={user.userImage} alt="" className="h-full object-cover " />
      </div>
      {link.map((el, index) => (
        <div
          key={index}
          className="w-full p-4 hover:bg-slate-300 text-center cursor-pointer"
          onClick={() => {
            setContent(el.name);
          }}
        >
          {el.name}
        </div>
      ))}
      <JustAButton name={"logout"} />
    </div>
  );
};

export default SideBar;
