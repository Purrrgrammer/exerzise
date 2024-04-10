import { useDispatch } from "react-redux";
import { logout } from "../../features/slices/userDataSlice";
import { useNavigate } from "react-router-dom";

export const JustAButton = ({ name }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(logout());
        navigate("/", { replace: true });
      }}
      className="p-3 mx-2 bg-red-200 hover:bg-white transition duration-500"
    >
      {name}
    </button>
  );
};
