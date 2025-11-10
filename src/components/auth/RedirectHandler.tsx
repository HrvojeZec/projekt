import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types/auth";

interface RedirectHandlerProps {
  children: React.ReactNode;
}

export const RedirectHandler: React.FC<RedirectHandlerProps> = ({
  children,
}) => {
  const { user } = useAuth();

  if (user) {
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
