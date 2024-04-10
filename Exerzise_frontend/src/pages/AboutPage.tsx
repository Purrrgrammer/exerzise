import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whoweare from "../components/Whoweare";
import PageHeaderCover from "../components/PageHeaderCover";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <PageHeaderCover
        header={"About"}
        background={
          "https://www.transparentpng.com/download/sports/yzYTPJ-multi-sport-program-pictures-png-images-pngio.png"
        }
      />
      <Whoweare />
      {/* <div>our history</div> */}
      <Footer />
    </>
  );
};

export default AboutPage;
