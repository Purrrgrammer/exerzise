import { useAppSelector } from "../store";

const Blank = () => {
  const user = useAppSelector((state) => state.user);

  return user.username !== "defaultusername" ? (
    <div className="h-[100vh] m-auto text-6xl text-center my-10">
      Please Book
    </div>
  ) : (
    <div className="h-[100vh] m-auto text-6xl text-center my-10">
      Please Register/Login
    </div>
  );
};

export default Blank;
