// components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useAuthStore } from "../store/create.auth.store";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "bod" | "user";
}

export const ProtectedWrapper = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { isLoading, isError } = useSession();
  const { isAuthenticated, user } = useAuthStore();

  if (isLoading) {
    return <div>Loading session...</div>; // Or a fancy spinner
  }

  if (isError || !isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
