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
  tagTypes: ["User", "Booking", "Schedule"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (form: FormArrType) => ({
        url: "register",
        method: "POST",
        body: form,
      }),
      invalidatesTags: () => ["User"],
      transformResponse: (response: { success: boolean; message: string }) =>
        response,
    }),
    login: builder.mutation({
      query: (usernamepassword) => ({
        url: "login",
        method: "POST",
        body: usernamepassword,
      }),
      transformResponse: (response: {
        data: UserLoginResponse;
        _token: string;
        success: boolean;
        message: string;
      }) => response,
    }),
    // getAllCoaches: builder.query({
    //   query: () => `coaches`,
    //   providesTags: (result, _error) =>
    //     result
    //       ? [
    //           ...result.map(({ userId }) => ({
    //             type: "User" as const,
    //             userId,
    //           })),
    //           { type: "User", id: "LIST" },
    //         ]
    //       : [{ type: "User", id: "LIST" }],
    //   transformResponse: (response: {
    //     data: CoachDataType[];
    //     success: boolean;
    //   }) => {
    //     console.log("this is bad");

    //     return response.data;
    //   },
    // }),
    // getCoach: builder.query({
    //   query: (userId) => `coach/${userId}`,
    //   providesTags: (arg) => [{ type: "User", arg }],
    //   transformResponse: (response: {
    //     data: CoachDataType[];
    //     success: boolean;
    //   }) => response.data,
    // }),
    getCoachSceduleByDay: builder.query<
      any,
      { coachId: string | undefined; date: string }
    >({
      query: (arg) => `coach/schedule/${arg.coachId}?time=30&date=${arg.date}`,
      providesTags: (result) => [
        { type: "Schedule", id: result.timeData.timeId },
      ],
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
      invalidatesTags: ["Schedule"],
    }),
    getBookings: builder.query({
      query: ({ userId, allDone }) => ({
        method: "GET",
        url: `user/schedule/${userId}/${allDone}`,
        params: { userId, allDone },
        transformResponse: (response: {
          data: BookingDataResponse[];
          success: boolean;
        }) => response.data,
      }),
      providesTags: (result, _error) =>
        result
          ? [
              ...result.map(({ bookingId }) => ({
                type: "Booking" as const,
                id: bookingId,
              })),
            ]
          : [{ type: "Booking", id: "LIST" }],
      transformResponse: (response: {
        data: BookingDataResponse[];
        success: boolean;
      }) => response.data,
    }),
    getCoachTime: builder.query({
      query: (coachId) => `coach/time/${coachId}`,
      providesTags: (result, _error) =>
        result
          ? [
              ...result.map(({ timeId }) => ({
                type: "Schedule" as const,
                id: timeId,
              })),
            ]
          : [{ type: "Schedule", id: "LIST" }],
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
      invalidatesTags: ["Booking"],
    }),
    updateBooking: builder.mutation({
      query: ({ bookingId, status, role }) => ({
        method: "PATCH",
        url: `schedule/${bookingId}?role=${role}`,
        body: { status },
        params: bookingId,
      }),
      invalidatesTags: (_result, _error, { bookingId }) => [
        { type: "Booking", id: bookingId },
      ],
    }),
    updateComment: builder.mutation({
      query: ({ bookingId, data }) => ({
        method: "PUT",
        url: `comment/${bookingId}`,
        body: data,
      }),
      transformResponse: (response: { message: string; success: boolean }) =>
        response.message,
      invalidatesTags: (_result, _error, { bookingId }) => [
        {
          type: "Booking",
          bookingId,
        },
      ],
    }),
    getUserProfile: builder.query({
      query: () => ({
        method: "GET",
        url: `user`,
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
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
      invalidatesTags: (_result, _error, { coachId }) => [
        { type: "Schedule", id: coachId },
      ],
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
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "User", userId },
      ],
    }),
  }),
});
export const {
  // useGetAllCoachesQuery,
  // useGetCoachQuery,
  useLoginMutation,
  useRegisterMutation,
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

// export const selectCoachesResult =
//   apiSlice.endpoints.getAllCoaches.select(null);

// const emptyCoaches: never[] = [];
// export const selectAllCoaches = createSelector(
//   selectCoachesResult,
//   (coachesResult) => coachesResult?.data ?? emptyCoaches
// );

// export const selectCoachById = createSelector(
//   selectAllCoaches,
//   (state, coachId) => coachId,
//   (coaches, coachId) => coaches.find((coach) => coach.id === coachId)
// );

////////////////////////////////
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
