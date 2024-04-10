import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import PageHeaderCover from "../components/PageHeaderCover";
import Blogs from "../components/Blogs";
import BlogCategories from "../components/BlogCategories";

const AboutPage = () => {
  const data = {
    header: "Voluptate exercitation sit sit laboris ut magna ",
    content:
      "Sunt sit elit culpa pariatur sint duis fugiat deserunt proident ipsum cupidatat sit. Quis reprehenderit occaecat esse sit amet esse nisi magna nisi incididunt labore labore in minim. Sunt Lorem ipsum ea labore ullamco ullamco quis dolore labore. Adipisicing pariatur ullamco occaecat aliquip laboris. Ad occaecat ad non incididunt nisi culpa nostrud sint minim.",
    author: "admin",
    date: "12/12/12",
    category: "boxing",
    cover: "",
  };
  const multipleData = Array.from({ length: 5 }, () => data);
  return (
    <>
      <Navbar />
      <PageHeaderCover
        header={"Blog"}
        background={
          "https://t4.ftcdn.net/jpg/02/86/76/77/360_F_286767786_boXM75PDLYIsYWzabZ3fKcM3esv50TNS.jpg"
        }
      />
      <div className="flex w-1/2 items-start mx-auto gap-x-3">
        <Blogs data={multipleData} />
        <div className="flex flex-col w-1/2 bg-slate-200 h-[500px]">
          <SearchBar placeholder={"search for blog"} handler={undefined} />
          <BlogCategories categories={multipleData} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
