import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  bookingDataResponse,
  coachDataType,
  userLoginResponse,
} from "../../interfaces";

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
        response: { data: userLoginResponse; _token: string; success: boolean },
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

    getCoachSceduleByDay: builder.query<
      any,
      { coachId: string | undefined; date: string }
    >({
      query: (arg) => `/coachschedule/${arg.coachId}?time=30&date=${arg.date}`,
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
        url: `/coach/schedule/${arg.coachId}`,
        method: "POST",
        body: arg.timeAvailable,
        params: arg.coachId,
      }),
    }),
    getBookings: builder.query<any, any>({
      query: (userId) => `schedule/${userId}`,
      providesTags: (result, error, id) => [{ type: "users", id }],
      transformResponse: (response: {
        data: bookingDataResponse;
        success: boolean;
      }) => response.data,
    }),
    getCoachTime: builder.query<any, any>({
      query: (coachId) => `/coachtime/${coachId}`,
      providesTags: ["users"],
      transformResponse: (response: { data: any; success: boolean }) =>
        response.data,
    }),
    postBookings: builder.mutation<any, { coachId: any; bookings: any }>({
      query: (arg) => ({
        method: "POST",
        url: `/coach/${arg.coachId}`,
        params: arg.coachId,
        body: arg.bookings,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    updateBooking: builder.mutation({
      query: ({ bookingId, status }) => ({
        method: "PUT",
        url: `/schedule/${bookingId}`,
        body: { status },
        params: bookingId,
      }),
    }),
    updateComment: builder.mutation<any, any>({
      query: ({ bookingIdd, data }) => ({
        method: "PUT",
        url: `comment/${bookingIdd}`,
        body: data ,
      }),
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
} = apiSlice;
