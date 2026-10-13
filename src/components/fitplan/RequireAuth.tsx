import { Navigate, Outlet, useLocation } from "react-router";
import { useFitPlanAuth } from "./AuthContext";

// Client-only auth gate for the signed-in shell. Waits for the root auth
// subscriber to resolve the stored session, then renders the child route or
// sends the visitor to /login.
export function RequireAuth() {
  const { user, loading } = useFitPlanAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
