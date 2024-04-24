import { createSlice } from "@reduxjs/toolkit";
import { UserLoginResponse } from "../../interfaces";

export const initialState: UserLoginResponse = {
  userId: "defaultuserId",
  detail: "defaultdetail",
  username: "defaultusername",
  firstname: "defaultfirstName",
  lastname: "defaultlastname",
  role: undefined,
  userImage:
    "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=",
  phonenumber: "defaultphonenumber",
};
//from API Slice

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: { payload: UserLoginResponse }) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    logout: (state) => {
      state = initialState;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log(state.firstname);
    },
  },
});
// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
