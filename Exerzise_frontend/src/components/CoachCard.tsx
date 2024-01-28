import Rating from "@mui/material/Rating";
import { Link, useParams } from "react-router-dom";

interface coachcardprops {
  coachIdd?: string;
  coachData?: any;
  isLoading?: boolean;
}
type coachDataType = {
  userId: string;
  detail: string;
  firstName: string;
  lastName: string;
  phonenumber: string;
  role: string;
  session: string;
  userImg: string;
  username: string;
};

const CoachCard = ({ coachData, isLoading }: coachcardprops) => {
  console.log("data from props", coachData);
  //data that fetched from coach

  return (
    <>
      {isLoading
        ? "loading......."
        : coachData!
            // .filter((el) => (coachId ? el.coachId == coachId : el))
            .map((el: coachDataType, index: number) => (
              <Link to={`/coach/${el.userId}`} key={index}>
                <div
                  key={index}
                  className="card-container flex flex-col hover:scale-105 transition duration-300"
                >
                  <div
                    className="coach-bg"
                    style={{ backgroundImage: `url(${el.bg})` }}
                  >
                    <div className="coach-img">
                      <img
                        className=""
                        src="https://e7.pngegg.com/pngimages/348/866/png-clipart-personal-trainer-fitness-centre-physical-fitness-strength-and-conditioning-coach-others-miscellaneous-tshirt.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="coach-bio flex flex-col justify-around">
                    <h1 className="text-xl p-1">
                      {el.firstName} {el.lastName}{" "}
                      {el.session && `| ${el.session}`}
                    </h1>
                    <div className="m-4 h-full">{el.detail}</div>
                    <div className="flex flex-col">
                      <div className="flex">
                        <Rating
                          name="simple-controlled"
                          defaultValue={2.5}
                          precision={0.5}
                          readOnly
                        />
                        <div className="ms-2">4.5/5 (603)</div>
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
            ))}
    </>
  );
};

export default CoachCard;
