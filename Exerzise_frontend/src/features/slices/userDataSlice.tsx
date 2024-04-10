import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { extendedType, userLoginResponse } from "../../interfaces";

export const initialState: userLoginResponse = {
  detail: "defaultdetail",
  firstname: "defaultfirstName",
  username: "defaultusername",
  lastname: "defaultlastname",
  role: undefined,
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
    setUser: (
      _state: any,
      action: { payload: extendedType; type: string }
    ): any | userLoginResponse => {
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", JSON.stringify(action.payload._token));
      console.log("set user success");

      return action.payload.data;
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
