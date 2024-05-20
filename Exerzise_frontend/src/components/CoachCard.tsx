import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { backgroundImages } from "../base";
import { CoachCardProps } from "../interfaces/propTypes";
// import { CoachDataType } from "../interfaces";
import { selectCoachById } from "../features/api/userApiSlice";
import { useSelector } from "react-redux";
// coachData,
const CoachCard = ({ userId }: CoachCardProps) => {
  const user = useSelector((state) => selectCoachById(state, userId));
  // console.log("user", user);

  return (
    <>
      <Link to={`/coach/${userId}`}>
        <div className="card-container flex flex-col hover:scale-105 transition duration-300">
          <div
            className="coach-bg"
            style={{
              backgroundImage: `url(${
                backgroundImages.some((bg) => bg.name === user.session)
                  ? backgroundImages.find((bg) => bg.name === user.session)?.bg
                  : null
              }
                      )`,
            }}
          >
            <img
              className="coach-img"
              src={user ? user.userImage : undefined}
              alt=""
            />
          </div>
          <div className="coach-bio flex flex-col justify-around">
            <h1 className="text-xl p-1">
              {user.firstname} {user.lastname}{" "}
              {user.session && `| ${user.session}`}
            </h1>
            <div>ID: {user.userId}</div>
            <div className="m-4 h-full">{user.detail}</div>
            <div className="flex flex-col">
              <div className="flex">
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  value={user.averageRating}
                  readOnly
                />
                <div className="ms-2">
                  ({user.ratingCount ? user.ratingCount : 0})
                </div>
              </div>
              {/* set schedule go to schedul to set data */}
              <button
                onClick={() => {
                  alert("booked");
                }}
                className="mt-1 p-2 bg-red-200 hover:bg-red-100"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CoachCard;
