import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideBar from "../components/styled/SideBar";
import { useState } from "react";
import List from "../components/List";

const UserPage = () => {
  const globalUser = useSelector((state: any) => state.user);
  const [content, setContent] = useState("profile");

  const user =
    localStorage.getItem("user") && localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user")!)
      : globalUser;

  let renderedcontent;

  switch (content) {
    case "profile":
      renderedcontent = (
        <div>
          <div>full name: {user.firstName + "  " + user.lastName}</div>
          <div>username: {user.id}</div>
          <div>ID: {user.id}</div>
          <div>role: {user.role}</div>
          <div>bio: {user.detail}</div>
        </div>
      );
      break;
    case "history":
      renderedcontent = (
        <div>
          <List />
        </div>
      );
      break;
    default:
      break;
  }
  return (
    <>
      <Navbar />
      <div className="flex">
        <SideBar setContent={setContent} />

        <div className="flex flex-col user-page-content mx-2 p-3 bg-slate-200 w-full">
          <h1>{content}</h1>
          <div className="user-page-body">{renderedcontent}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
