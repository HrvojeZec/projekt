import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User, AuthContextType, UserRole } from "../types/auth";
import { ROLE_PERMISSIONS } from "../config/permissions";
import { mockLogin } from "../utils/mockAuth";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        sessionStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Using mock login for testing
      const userData = await mockLogin(email, password);

      // For production, replace with:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // if (!response.ok) throw new Error('Login failed');
      // const userData = await response.json();

      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", userData.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(user.role);
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    const fullPermission = `${resource}:${action}`;
    const wildcardResource = `${resource}:*`;
    const wildcardAll = "*:*";

    return userPermissions.some(
      (permission) =>
        permission === fullPermission ||
        permission === wildcardResource ||
        permission === wildcardAll
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, hasRole, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
