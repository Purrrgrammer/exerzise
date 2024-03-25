import ReactDOM from "react-dom/client";
import { AboutPage, HomePage, Root, Schedule } from "./pages/index";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import CoachPage from "./pages/CoachPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import UserPage from "./pages/UserPage";
import CoachDetail from "./pages/CoachDetail";
import ScheduleDetailPage from "./pages/ScheduleDetailPage";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
// RTK Query
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice, bookingApi } from "./features/api/apiSlice";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import CoachSchedule from "./pages/CoachSchedule";

const coachRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  // main
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "schedule",
    element: <Schedule />,
  },
  {
    path: "schedule/:exzId",
    element: <ScheduleDetailPage />,
  },
  // auth
  {
    path: "coach",
    element: <CoachPage />,
  },
  {
    path: "activities",
    element: <ActivitiesPage />,
  },
  {
    path: "user",
    element: <UserPage />,
  },
  {
    path: "coach/:coachId",
    element: <CoachDetail />,
  },
  {
    path: "blog",
    element: (
      <ProtectedRoute
        user={localStorage.getItem("user")! && "coach"}
        isAllowed={true}
        redirectPath={"/"}
      >
        <Blog />
      </ProtectedRoute>
    ),
  },
  {
    path: "coach/schedule",
    element: (
      <ProtectedRoute
        user={localStorage.getItem("user")! && "coach"}
        isAllowed={true}
        redirectPath={"/"}
      >
        <CoachSchedule />
      </ProtectedRoute>
    ),
  },
  {
    path: "blog/:blogId",
    element: <BlogDetail />,
  },
]);
const commonRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  // main
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "schedule",
    element: <Schedule />,
  },
  {
    path: "schedule/:exzId",
    element: <ScheduleDetailPage />,
  },
  // auth
  {
    path: "coach",
    element: <CoachPage />,
  },
  {
    path: "activities",
    element: <ActivitiesPage />,
  },
  {
    path: "user",
    element: <UserPage />,
  },
  {
    path: "coach/:coachId",
    element: <CoachDetail />,
  },
  // {
  //   path: "blog",
  //   element: <Blog />,
  // },
  {
    path: "blog/:blogId",
    element: <BlogDetail />,
  },
]);

const selectRouter = localStorage.getItem("user")! ? coachRouter : commonRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        {/* <BrowserRouter>
          <App /> */}
        <RouterProvider router={coachRouter} />
        {/* </BrowserRouter> */}
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
