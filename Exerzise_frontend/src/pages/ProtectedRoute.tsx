import { Navigate, Outlet } from "react-router-dom";

interface protectedRouteprops {
  // user: "user" | "coach";
  user: "user" | "coach" | string;
  children: any;
  redirectPath: string;
  isAllowed: boolean;
}
export const ProtectedRoute = ({
  user,
  children,
  redirectPath,
  isAllowed,
}: protectedRouteprops) => {
  if (user !== "coach") {
    return <Navigate to={redirectPath} replace />;
  }
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
