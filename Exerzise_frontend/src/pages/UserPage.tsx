import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideBar from "../components/styled/SideBar";
import { useState } from "react";
import List from "../components/List";
import { findLocalUser } from "../function";

const UserPage = () => {
  const globalUser = useSelector((state: any) => state.user);
  const [content, setContent] = useState("profile");
  const user = findLocalUser("user", globalUser);

  let renderedcontent;

  switch (content) {
    case "profile":
      renderedcontent = (
        <div className="text-xl">
          <div>username: {user.username}</div>
          <div>full name: {user.firstname + "  " + user.lastname}</div>
          <div>ID: {user.userId}</div>
          <div>role: {user.role}</div>
          <div>bio: {user.detail}</div>
        </div>
      );
      break;
    case "history":
      renderedcontent = <List />; //send props to list
      break;
    default:
      break;
  }
  return (
    <>
      <Navbar />
      <div className="flex">
        <SideBar setContent={setContent} />
        <div className="flex flex-col user-page-content mx-2 p-5 bg-slate-200 w-full">
          <h1 className="p-3 text-3xl">{content}</h1>
          <div className="user-page-body">{renderedcontent}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
