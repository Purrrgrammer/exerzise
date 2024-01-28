import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { extendedType, userResponse } from "../../interfaces";

const initialState: userResponse = {
  username: "default",
  firstName: "default firstname",
  lastName: "default lastname",
  role: "non-user",
  userId: "default",
  userImage:
    "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=",
  detail: "defaultdefaultdefault",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<extendedType>) => {
      console.log("action.payload.data", action.payload.data);
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", JSON.stringify(action.payload._token));
      state = action.payload;
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(initialState));
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
