import React from "react";
import { RootState } from "../store";
import Navbar from "../components/Navbar";
import Bars from "../components/Bars";
import Body1 from "../components/Body1";
import FGrid from "../components/FGrid";
import Footer from "../components/Footer";
import Testomonials from "../components/Testomonials";
import Benefits from "../components/Benefits";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="cover-container">
        <img
          className="cover"
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
        <div className="cover-header">welcome to Exerzise </div>
      </div>
      <Bars />
      <Body1 />
      <Benefits />
      <FGrid />
      <div className="my-5">
        <Testomonials />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
