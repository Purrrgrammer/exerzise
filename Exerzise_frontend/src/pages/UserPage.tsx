import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useState } from "react";
import List from "../components/List";
import { useAppSelector } from "../store";

const UserPage = () => {
  // const user = findLocalUser("user", globalUser);
  // console.log("logged in user", user);
  // console.log("d user", initialState);

  const user = useAppSelector((state) => state.user);

  const [content, setContent] = useState<string>("profile");
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
          <div className="flex flex-col gap-x-3">
            <label htmlFor="">edit your bio</label>
            <input className="p-2"></input>
          </div>
        </div>
      );
      break;
    case "history":
      renderedcontent = <List />; //send props to list
      break;
    default:
      renderedcontent = <div>coming soon.....</div>; //send props to list
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
