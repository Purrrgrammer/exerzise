type contentProp = {
  content: string;
};
const Blank = ({ content }: contentProp) => {
  return (
    <div className="h-[100vh] m-auto text-6xl text-center my-10">{content}</div>
  );
};

export default Blank;
