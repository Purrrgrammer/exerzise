import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { backgroundImages } from "../base";
import { coachDataType } from "../interfaces";

interface coachcardprops {
  coachData?: any;
}

const CoachCard = ({ coachData }: coachcardprops) => {
  // console.log("data from props", coachData);
  //data that fetched from coach
  return (
    <>
      {coachData
        ? coachData!.map((el: coachDataType, index: number) => (
            <Link to={`/coach/${el.userId}`} key={index}>
              <div
                key={index}
                className="card-container flex flex-col hover:scale-105 transition duration-300"
              >
                <div
                  className="coach-bg"
                  style={{
                    backgroundImage: `url(${
                      backgroundImages.some((bg) => bg.name === el.session)
                        ? backgroundImages.find((bg) => bg.name === el.session)
                            ?.bg
                        : null
                    }
                      )`,
                  }}
                >
                  <img
                    className="coach-img"
                    src={
                      el.userImg
                        ? el.userImg
                        : "https://e7.pngegg.com/pngimages/348/866/png-clipart-personal-trainer-fitness-centre-physical-fitness-strength-and-conditioning-coach-others-miscellaneous-tshirt.png"
                    }
                    alt=""
                  />
                </div>
                <div className="coach-bio flex flex-col justify-around">
                  <h1 className="text-xl p-1">
                    {el.firstname} {el.lastname}{" "}
                    {el.session && `| ${el.session}`}
                  </h1>
                  <div>ID: {el.userId}</div>
                  <div className="m-4 h-full">{el.detail}</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        value={el.rating / el.ratingCount}
                        readOnly
                      />
                      <div className="ms-2">
                        ({el.ratingCount ? el.ratingCount : 0})
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
          ))
        : null}
    </>
  );
};

export default CoachCard;
