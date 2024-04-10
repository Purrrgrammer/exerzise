import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeaderCover from "../components/PageHeaderCover";
import Blank from "../components/Blank";

const ClassPage = () => {
  return (
    <>
      <Navbar />
      <PageHeaderCover
        header={"Classess"}
        background={
          "https://t3.ftcdn.net/jpg/05/09/37/66/360_F_509376624_VhCMojj4LpZxNeidEabWqCsiM0QXtfn7.jpg"
        }
      />
      <Blank content={"Coming Soon...."} />
      <Footer />
    </>
  );
};

export default ClassPage;
