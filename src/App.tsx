import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { RedirectHandler } from "./components/auth/RedirectHandler";
import { UserRole } from "./types/auth";
import { LoginPage } from "./Pages/LoginPage";
import { UnauthorizedPage } from "./Pages/UnauthorizedPage";
import { SuperAdminLayout } from "./Pages/SuperAdminLayout";
import { AdminLayout } from "./Pages/AdminLayout";
import { ProjectPage } from "./Pages/ProjectPage";
import { CreateProjectPage } from "./Pages/CreateProjectPage";
import { DashboardPage } from "./Pages/DashboardPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={<RedirectHandler>{<LoginPage />}</RedirectHandler>}
          />

          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Super Admin routes */}
          <Route
            path="/super-admin/*"
            element={
              <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
                {<SuperAdminLayout />}
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                allowedRoles={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}
              >
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/* Project Partner routes */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute
                allowedRoles={[
                  UserRole.SUPER_ADMIN,
                  UserRole.ADMIN,
                  UserRole.PROJECT_PARTNER,
                  UserRole.PRODUCER,
                ]}
              >
                <ProjectPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/create"
            element={
              <ProtectedRoute
                allowedRoles={[
                  UserRole.SUPER_ADMIN,
                  UserRole.ADMIN,
                  UserRole.PROJECT_PARTNER,
                ]}
              >
                {<CreateProjectPage />}
              </ProtectedRoute>
            }
          />

          {/* Producer & Delegate routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute>{<DashboardPage />}</ProtectedRoute>}
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
