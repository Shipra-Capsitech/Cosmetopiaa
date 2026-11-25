import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  isLoading?: boolean;
  redirectPath?: string;
}

const ProtectedRoute = ({
  allowedRoles,
  isLoading = false,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check authentication
  if (!token) {
    return (
      <Navigate
        to={redirectPath}
        state={{ from: location }}
        replace
      />
    );
  }

  // Check user role
  if (!allowedRoles.includes(role?.toLowerCase() ?? "")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;