import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AddBtn from "./AddBtn";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../features/api/apiSlice";
import { initialState } from ".././features/slices/userDataSlice";
// import { findLocalUser } from "../function";
const pages = [
  { name: "Exerzise", path: "/home", icon: "../../public/logo1.jpg" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Coaches", path: "/coach" },
  { name: "Classes", path: "/classes" },
  { name: "Schedule", path: "/schedule" },
];

const Navbar = () => {
  // const user1 = useSelector((state: any) => state.user);
  // const user = findLocalUser("user", globalUser);
  // const token = JSON.parse(localStorage.getItem("token")!);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [skip, setSkip] = useState(false);

  const { data: user, error, isLoading } = useGetUserProfileQuery(undefined); //coach data,
  const [displayUser, setDisplayUser] = useState(initialState);

  const [nav, setNav] = useState(false);
  useEffect(() => {
    // setSkip(false);
    // if (!token || user === undefined) {
    //   setDisplayUser(initialState);
    // } else {
    //   setDisplayUser(user);
    //   console.log("user", user);
    // }
    // console.log("displayUser", displayUser);
  }, [user, token]);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="nav flex justify-between mx-10 mb-4 ">
      <ul className="hidden md:flex max-lg:hidden justify-center items-center ">
        {pages.map((el, index) => (
          <NavLink
            key={index}
            to={el.path}
            className={({ isActive, isPending }) =>
              isActive ? `activeL` : isPending ? "pending" : ""
            }
          >
            <div className={`lg:px-6 ${el.path === "/home" && "mr-[100px]"}`}>
              {el.icon ? (
                <div className="text-3xl text-black">
                  {/* main-logo-container */}
                  {el.name}
                  {/* <img src={el.icon} alt={el.name} className="main-logo" /> */}
                </div>
              ) : (
                el.name
              )}
            </div>
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center">
        <AddBtn />
        <NavLink
          key={1}
          to={"/user"}
          className={({ isActive, isPending }) =>
            isActive ? "activeL" : isPending ? "pending" : ""
          }
        >
          <div className="lg:px-10">
            <img
              className="w-5 h-5"
              src={displayUser.userImage}
              alt={displayUser.username}
            />
          </div>
        </NavLink>
      </div>
      {/* mobile Icon*/}
      <div
        onClick={handleNav}
        className="block md:hidden mx-2 hover:cursor-pointer"
      >
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="m-4 text-3xl font-bold text-[#E94823]">
          {<div>{pages[0].name}</div>}
        </h1>
        {/* Mobile Navigation Items */}
        {pages
          .map((item, index) => (
            <li
              key={index}
              className="p-4 border-b border-gray-600 rounded-xl hover:bg-[#D8D8D8] duration-300 cursor-pointer "
            >
              <Link to={item.path} id="moblienav">
                {item.name}
              </Link>
            </li>
          ))
          .slice(1, 5)}
        <li
          key={13}
          className="p-4 border-b border-gray-600 rounded-xl hover:bg-[#D8D8D8] duration-300 cursor-pointer "
        >
          <Link to={"/user"} id="moblienav">
            {displayUser.username}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
