import { Navigate, Outlet } from "react-router-dom";

interface protectedRouteprops {
  // user: "user" | "coach";
  user: "user" | "coach" | undefined;
  children: any;
  redirectPath: string;
  isAllowed: boolean;
  accessibleRole: string | string[];
}
export const ProtectedRoute = ({
  user,
  redirectPath,
  isAllowed,
  children,
  accessibleRole,
}: protectedRouteprops) => {
  console.log("user local from route", user);

  if (!accessibleRole.includes(user)) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
