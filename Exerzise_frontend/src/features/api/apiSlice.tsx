import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BookingDataResponse,
  CoachDataType,
  CoachTimeResponse,
  FormArrType,
  UserLoginResponse,
} from "../../interfaces";

export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery: axiosBaseQuery(),
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers) => {
      const localToken = localStorage.getItem("token");
      const token = localToken ? JSON.parse(localToken).token : "";
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
    register: builder.mutation({
      query: (form: FormArrType) => ({
        url: "register",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["users"],
      transformResponse: (response: { success: boolean; message: string }) =>
        response,
    }),
    login: builder.mutation({
      query: (usernamepassword) => {
        return {
          url: "login",
          method: "POST",
          body: usernamepassword,
        };
      },
      transformResponse: (response: {
        data: UserLoginResponse;
        _token: string;
        success: boolean;
        message: string;
      }) => response,
    }),
    getAllCoaches: builder.query({
      query: () => `coaches`,
      providesTags: ["users"],
      transformResponse: (response: {
        data: CoachDataType[];
        success: boolean;
      }) => response.data,
    }),

    getCoach: builder.query({
      query: (userId) => `coach/${userId}`,
      providesTags: (_result, _error, id) => [{ type: "users", id }],
      transformResponse: (response: {
        data: CoachDataType[];
        success: boolean;
      }) => response.data,
    }),
    getCoachSceduleByDay: builder.query<
      any,
      { coachId: string | undefined; date: string }
    >({
      query: (arg) => `coachschedule/${arg.coachId}?time=30&date=${arg.date}`,
      providesTags: ["users"],
      transformResponse: (response: {
        data: CoachDataType[];
        timeData: CoachTimeResponse[];
        availableTime: string[]; //array of times
        message: string;
      }) => response,
    }),
    postSchedule: builder.mutation({
      //call dispatch and passin the data.unwrap()** =return promise
      query: ({ coachId, timeAvailable }) => ({
        url: `coach/schedule/${coachId}`,
        method: "POST",
        body: timeAvailable,
        params: coachId,
      }),
    }),
    getBookings: builder.query({
      query: ({ userId, allDone }) => ({
        method: "GET",
        url: `schedule/${userId}/${allDone}`,
        params: { userId, allDone },
        transformResponse: (response: {
          data: BookingDataResponse[];
          success: boolean;
        }) => response.data,
      }),
      providesTags: (_result, _error, id) => [{ type: "users", id }],
      transformResponse: (response: {
        data: BookingDataResponse[];
        success: boolean;
      }) => response.data,
    }),
    getCoachTime: builder.query({
      query: (coachId) => `coachtime/${coachId}`,
      providesTags: ["users"],
      transformResponse: (response: {
        data: CoachTimeResponse[];
        success: boolean;
      }) => response.data,
    }),
    postBookings: builder.mutation({
      query: (arg) => ({
        //     query(arg: QueryArg): BaseQueryArg<BaseQuery>;
        method: "POST",
        url: `coach/${arg.coachId}`,
        params: arg.coachId,
        body: arg.bookings,
      }),
      transformResponse: (response: { message: "string"; success: boolean }) =>
        response,
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
    getUserProfile: builder.query({
      query: () => ({
        method: "GET",
        url: `user`,
      }),
      providesTags: (_result, _error, id) => [{ type: "users", id }],
      transformResponse: (response: {
        data: UserLoginResponse;
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

//axios base query
/* const axi = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
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

export default axiosBaseQuery;*/
