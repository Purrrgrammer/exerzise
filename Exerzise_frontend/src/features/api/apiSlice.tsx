import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  bookingDataResponse,
  coachDataType,
  updateCommentType,
  userLoginResponse,
} from "../../interfaces";
import axios from "axios";

const axi = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${
      localStorage.getItem("token") &&
      JSON.parse(localStorage.getItem("token")!)
    }`,
  },
});

axi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      window.location.pathname !== "/login"
    ) {
      alert("User Expired");
      // handleLogout();
      // handleOpenUnauthorized('User Expired')
      return;
    }
    const res = error.response;
    console.error("Looks like there was a problem. Status", res.status);
    return Promise.reject(error);
  }
);
const axiosBaseQuery =
  () =>
  async ({ body, ...restArgs }) => {
    try {
      const result = await axi({ data: body, ...restArgs });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery: axiosBaseQuery(),
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("token")!);
      // console.log("token from redux", token);
      // If we have a token set in the state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    register: builder.mutation<any, any>({
      query: (form) => ({
        url: "register",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["users"],
    }),
    login: builder.mutation<any, any>({
      query: (usernamepassword) => {
        return {
          url: "login",
          method: "POST",
          body: usernamepassword,
        };
      },
      transformResponse: (
        response: {
          data: userLoginResponse;
          _token: string;
          success: boolean;
          message: boolean;
        },
        meta,
        arg
      ) => response,
    }),
    getAllCoaches: builder.query<any, any>({
      query: () => `coaches`,
      providesTags: ["users"],
      transformResponse: (response: { data: any; success: boolean }) =>
        response.data,
    }),

    getCoachSceduleByDay: builder.query<
      any,
      { coachId: string | undefined; date: string }
    >({
      query: (arg) => `coachschedule/${arg.coachId}?time=30&date=${arg.date}`,
      providesTags: ["users"],
      transformResponse: (response: {
        data: any;
        availableTime: string;
      }): any => response,
    }),
    getCoach: builder.query<any, any>({
      query: (userId) => `coach/${userId}`,
      providesTags: (result, error, id) => [{ type: "users", id }],
      transformResponse: (response: {
        data: coachDataType;
        success: boolean;
      }) => response.data,
    }),
    postSchedule: builder.mutation<
      any,
      { timeAvailable: any | undefined; coachId: string | null }
    >({
      //call dispatch and passin the data.unwrap()** =return promise
      query: (arg: any) => ({
        url: `coach/schedule/${arg.coachId}`,
        method: "POST",
        body: arg.timeAvailable,
        params: arg.coachId,
      }),
    }),
    getBookings: builder.query<any, any>({
      query: ({ userId, allDone }) => ({
        method: "GET",
        url: `schedule/${userId}/${allDone}`,
        params: { userId, allDone },
      }),
      providesTags: (result, error, id) => [{ type: "users", id }],
      transformResponse: (response: {
        data: bookingDataResponse;
        success: boolean;
      }) => response.data,
    }),
    getCoachTime: builder.query<any, any>({
      query: (coachId) => `coachtime/${coachId}`,
      providesTags: ["users"],
      transformResponse: (response: { data: any; success: boolean }) =>
        response.data,
    }),
    postBookings: builder.mutation<any, { coachId: any; bookings: any }>({
      query: (arg) => ({
        method: "POST",
        url: `coach/${arg.coachId}`,
        params: arg.coachId,
        body: arg.bookings,
      }),
      transformResponse: (
        response: { message: "string"; success: boolean },
        meta,
        arg
      ) => response,
    }),
    updateBooking: builder.mutation({
      query: ({ bookingId, status }) => ({
        method: "PUT",
        url: `schedule/${bookingId}`,
        body: { status },
        params: bookingId,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ bookingId, data }) => ({
        method: "PUT",
        url: `comment/${bookingId}`,
        body: data,
      }),
    }),
    getUserProfile: builder.query<any, any>({
      query: () => ({
        method: "GET",
        url: `user`,
      }),
      providesTags: (result, error, id) => [{ type: "users", id }],
      transformResponse: (response: {
        data: userLoginResponse;
        success: boolean;
      }) => response.data,
    }),
    deleteSchedule: builder.mutation({
      query: ({ coachId, day }) => ({
        method: "delete",
        url: `schedule/delete/${coachId}`,
        body: { day: day },
      }),
    }),
    upload: builder.mutation({
      query: ({ userId, imageFile }) => {
        // query: ({ userId, imageFile }) => {
        console.log("userId from apislice", userId);

        console.log("imageFile from slice", imageFile);
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("userId", userId);
        console.log({ imageFile, userId });
        console.log("logging formData", Array.from(formData));

        return {
          method: "post",
          url: `upload/${userId}`,
          body: formData,
          formData: true,
          params: userId,
        };
      },
    }),
  }),
});
export const {
  useGetCoachQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetAllCoachesQuery,
  useGetCoachSceduleByDayQuery,
  usePostScheduleMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
  useGetCoachTimeQuery,
  usePostBookingsMutation,
  useUpdateCommentMutation,
  useGetUserProfileQuery,
  useDeleteScheduleMutation,
  useUploadMutation,
} = apiSlice;
