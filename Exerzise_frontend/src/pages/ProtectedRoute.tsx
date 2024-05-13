import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

interface protectedRouteprops {
  user?: "user" | "coach";
  children: React.ReactNode;
  redirectPath: string;
  isAllowed: boolean;
  accessibleRole: string | string[];
}
export const ProtectedRoute = ({
  user = "user",
  redirectPath,
  isAllowed,
  children,
  accessibleRole,
}: protectedRouteprops) => {
  // console.log("user local from route", user);
  const usernow = useAppSelector((state) => state.user);

  if (!accessibleRole.includes(user || usernow.role)) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? (
    children
  ) : (
    <Outlet />
    // <ToastProvider>
    // </ToastProvider>
  );
};
