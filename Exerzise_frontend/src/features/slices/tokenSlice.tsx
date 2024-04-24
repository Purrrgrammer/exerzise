import { createSlice } from "@reduxjs/toolkit";
import { TokenResponseType } from "../../interfaces";

export const initialState: TokenResponseType = {
  token: "",
};
//from API Slice

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (
      _state,
      action: { payload: TokenResponseType }
    ): TokenResponseType => {
      // console.log("token payload", action.payload);
      localStorage.setItem("token", JSON.stringify(action.payload));
      // console.log("set user success from tokenSlice");
      return action.payload;
    },
    clearToken: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
