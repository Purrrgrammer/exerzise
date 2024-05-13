import { JustAButton } from "./regular";
import { useUploadMutation } from "../features/api/apiSlice";
import { useState } from "react";
import Popup from "reactjs-popup";
import { useAppSelector } from "../store";
import { SideBarPropsType } from "../interfaces/propTypes";
import { toast } from "react-toastify";

const SideBar = ({ setContent }: SideBarPropsType) => {
  // const user = findLocalUser("user", globalUser);
  const user = useAppSelector((state) => state.user);

  // const token = useAppSelector((state) => state.token);
  // const [displayUser, setDisplayUser] = useState(initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(
    undefined
  );

  const [upup] = useUploadMutation();
  const upload = () => {
    // console.log("file from usestate", imageFile);
    upup({
      userId: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!).userId
        : null,
      imageFile: imageFile,
    })
      .unwrap()
      .then((fulfillled) => {
        toast.success(fulfillled.message);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const link = [{ name: "profile" }, { name: "history" }, { name: "favorite" }];

  return (
    <div className="h-screen w-[200px] bg-red-200 p-4 flex flex-col items-center">
      <div className="my-4 relative">
        <img
          src={user.userImage}
          alt=""
          className="w-[100px] h-[100px] rounded-full object-cover "
        />
        <Popup
          trigger={
            <button className="absolute bottom-0 right-2 button cursor-pointer p-1 bg-red-400 rounded">
              +
            </button>
          }
          modal
          nested
        >
          <div className="flex justify-around flex-col md:flex-row items-center">
            <input
              className="w-100"
              type="file"
              name="button2"
              id="button2"
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  console.error("Select a file");
                  return;
                }
                const file = e.target.files[0];
                // console.log("target file ", file);
                // setImageFile(file);

                const reader = new FileReader();
                reader.onloadend = () => {
                  console.log(`setting new file`);
                  setImageFile(file);
                  setImagePreviewUrl(reader.result as string);
                  console.log(`setting done`);
                  console.log(`new file is set`, imageFile);
                };
                reader.readAsDataURL(file);
              }}
            />
            {/* <label className="inline-block cursor-pointer p-1 bg-slate-400 rounded">
              +
            </label>{" "} */}{" "}
            <img
              src={
                imagePreviewUrl
                  ? imagePreviewUrl
                  : "https://dcvta86296.i.lithium.com/t5/image/serverpage/image-  id/14321i0011CCD2E7F3C8F8/image-size/large?v=1.0&px=999"
              }
              style={{ width: "200px", height: "200px" }}
            />
            <button
              className="inline-block cursor-pointer p-1 bg-slate-400 rounded"
              onClick={upload}
            >
              proceed
            </button>
          </div>
        </Popup>
      </div>
      {link.map((el, index) => (
        <div
          key={index}
          className="w-full p-4 hover:bg-slate-300 text-center cursor-pointer"
          onClick={() => {
            setContent(el.name);
          }}
        >
          {el.name}
        </div>
      ))}

      <JustAButton name={"logout"} />
    </div>
  );
};

export default SideBar;
