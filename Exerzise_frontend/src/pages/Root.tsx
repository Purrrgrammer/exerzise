import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Form from "../components/Form/Form";
import Footer from "../components/Footer";

const Root = () => {
  const [pageState, setPageState] = useState("register");
  return (
    <>
      <Navbar />
      <div id="detail">
        {pageState === "register" ? (
          <Form
            setPageState={setPageState}
            pageState={pageState}
            name={"register"}
          />
        ) : (
          <Form
            setPageState={setPageState}
            pageState={pageState}
            name={"login"}
          />
        )}
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Root;
