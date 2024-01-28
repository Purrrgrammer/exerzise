import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userResponse } from "../../interfaces";
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
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    register: builder.mutation<any, any>({
      query: (form) => ({
        url: "/register",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["users"],
    }),
    login: builder.mutation<any, any>({
      query: (usernamepassword) => ({
        url: "/login",
        method: "POST",
        body: usernamepassword,
      }),
      transformResponse: (
        response: { data: userResponse; _token: string; success: boolean },
        meta,
        arg
      ) => response,
    }),
    getAllCoaches: builder.query<any, any>({
      query: () => `/coaches`,
      providesTags: ["users"],
      transformResponse: (response: { data: any; success: boolean }) =>
        response.data,
    }),
    getCoach: builder.query<any, any>({
      query: (userId) => `coach/${userId}`,
      providesTags: (result, error, id) => [{ type: "users", id }],
      transformResponse: (response: { data: any; success: boolean }) =>
        response.data,
    }),
    setExz: builder.mutation({
      //call dispatch and passin the data.unwrap()** =return promise
      query: (exz) => ({
        url: "/posts",
        method: "POST",
        body: exz,
      }),
    }),
  }),
});
// this create custom hooks trough the names

export const {
  useGetCoachQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetAllCoachesQuery,
} = apiSlice;
