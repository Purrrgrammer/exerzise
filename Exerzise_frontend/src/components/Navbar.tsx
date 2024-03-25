import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AddBtn from "./AddBtn";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { findLocalUser } from "../function";

const Navbar = () => {
  const globalUser = useSelector((state: any) => state.user);
  const user = findLocalUser("user", globalUser);

  const pages = [
    { name: "Exerzise", path: "/home", icon: "../../public/logo1.jpg" },
    { name: "About", path: "/about" },
    { name: "Activities", path: "/activities" },
    { name: "Schedule", path: "/schedule" },
    { name: "Coaches", path: "/coach" },
  ];

  const [nav, setNav] = useState(false);

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
            <div className={`lg:px-10 ${el.path === "/home" && "mr-[100px]"}`}>
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
          <div className=" lg:px-10 ">
            <img
              className="w-5 h-5"
              src={user?.userImage}
              alt={user?.username}
            />{" "}
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
        <h1 className="w-full text-3xl font-bold text-[#E94823] m-4">
          {<div>{pages[0].name}</div>}
        </h1>
        {/* Mobile Navigation Items */}
        {pages
          .map((item, index) => (
            <li
              key={index}
              className="p-4 border-b rounded-xl hover:bg-[#D8D8D8] duration-300 hover:text-black text-white cursor-pointer border-gray-600"
            >
              <Link to={item.path} id="none">
                {item.name}
              </Link>
            </li>
          ))
          .slice(1, 5)}
        <li
          key={13}
          className="p-4 border-b rounded-xl hover:bg-[#D8D8D8] duration-300 hover:text-black text-white cursor-pointer border-gray-600"
        >
          <Link to={"/user"} id="none">
            {user?.username}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
