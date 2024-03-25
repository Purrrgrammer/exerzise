import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { extendedType, userLoginResponse } from "../../interfaces";

const initialState: userLoginResponse | string = {
  detail: "defaultdetail",
  firstName: "defaultfirstName",
  username: "defaultusername",
  lastName: "defaultlastname",
  role: "non-user",
  userId: "defaultuserId",
  userImage:
    "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=",
  phonenumber: "defaultphonenumber",
};
//from API Slice

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<extendedType>) => {
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", JSON.stringify(action.payload._token));
      console.log("action.payload.data", action.payload.data);
      state = action.payload;
    },
    logout: () => {
      localStorage.removeItem("user");
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
