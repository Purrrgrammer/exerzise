import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { CoachDataType } from "../../interfaces";
import { apiSlice } from "./apiSlice";
import { store } from "../../store";

const usersAdapter = createEntityAdapter({
  selectId: (e: CoachDataType) => e.userId,
  sortComparer: (a, b) => a.firstname.localeCompare(b.firstname),
});

const initialState = usersAdapter.getInitialState();
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoaches: builder.query({
      transformResponse: ({ data }: any) => {
        console.log(usersAdapter.setAll(initialState, data));
        return usersAdapter.setAll(initialState, data);
      },
      query: () => `coaches`,
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.ids.map(({ userId }: any) => ({
                type: "User" as const,
                userId,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getCoach: builder.query({
      query: (userId) => `coach/${userId}`,
      providesTags: (arg) => [{ type: "User", arg }],
      transformResponse: (response: {
        data: CoachDataType[];
        success: boolean;
      }) => response.data,
    }),
  }),
});

export const { useGetAllCoachesQuery, useGetCoachQuery } = userApiSlice;
//normalizing data before it is cached (for performance)
export const selectCoachesResult =
  userApiSlice.endpoints.getAllCoaches.select(null);
const selectCoachesData = createSelector(
  selectCoachesResult,
  (coachesResult) => coachesResult.data
);
type RootState = ReturnType<typeof store.getState>;
export interface normalizedSelectorType {
  selectAll: any;
  selectById: any;
  selectIds: any;
  selectEntities: any;
}
export const {
  selectAll: selectAllCoaches,
  selectById: selectCoachById,
  selectIds: selectCoachIds,
  selectEntities: selectSession,
}: normalizedSelectorType = usersAdapter.getSelectors<RootState>(
  (state) => selectCoachesData(state) ?? initialState
);
