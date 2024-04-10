import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideBar from "../components/styled/SideBar";
import { useEffect, useState } from "react";
import List from "../components/List";
import { findLocalUser } from "../function";
import { useGetUserProfileQuery } from "../features/api/apiSlice";
import { initialState } from ".././features/slices/userDataSlice";

const UserPage = () => {
  // const user = findLocalUser("user", globalUser);
  const token = JSON.parse(localStorage.getItem("token")!);
  const { data: user, error, isLoading } = useGetUserProfileQuery(null); //coach data
  const [content, setContent] = useState("profile");
  const [displayUser, setDisplayUser] = useState(initialState);
  let renderedcontent;
  // console.log("logged in user", user);
  // console.log("d user", initialState);

  useEffect(() => {
    if (user?.isSuccess !== false && !isLoading && user !== undefined) {
      setDisplayUser(user);
    } else {
      setDisplayUser(initialState);
    }
  }, [user]);

  switch (content) {
    case "profile":
      renderedcontent = isLoading ? (
        "loading"
      ) : (
        <div className="text-xl">
          <div>username: {displayUser.username}</div>
          <div>
            full name: {displayUser.firstname + "  " + displayUser.lastname}
          </div>
          <div>ID: {displayUser.userId}</div>
          <div>role: {displayUser.role}</div>
          <div>bio: {displayUser.detail}</div>
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
