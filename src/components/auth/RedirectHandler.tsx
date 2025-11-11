import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types/auth";

interface RedirectHandlerProps {
  children: React.ReactNode;
}

export const RedirectHandler: React.FC<RedirectHandlerProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();
  // Dodaj OVU JEDNU LINIJU:
  const isAuthRoute = /^\/auth\//.test(location.pathname);

  // I izmijeni IF:
  if (user && !isAuthRoute) {
    // Redirect authenticated users based on role
    const roleRedirects: Record<UserRole, string> = {
      [UserRole.SUPER_ADMIN]: "/super-admin/dashboard",
      [UserRole.ADMIN]: "/admin/dashboard",
      [UserRole.PROJECT_PARTNER]: "/projects",
      [UserRole.PRODUCER]: "/projects",
      [UserRole.DELEGATE]: "/dashboard",
    };

    return <Navigate to={roleRedirects[user.role]} replace />;
  }

  return <>{children}</>;
};
