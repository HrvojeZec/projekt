import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MOCK_USERS } from "../utils/mockAuth";
import { UserRole } from "../types/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMockUsers, setShowMockUsers] = useState(true);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (testEmail: string) => {
    const mockUser = MOCK_USERS[testEmail];
    if (mockUser) {
      setEmail(testEmail);
      setPassword(mockUser.password);
    }
  };

  const getRoleBadgeColor = (role: UserRole): string => {
    const colors: Record<UserRole, string> = {
      [UserRole.SUPER_ADMIN]: "bg-purple-100 text-purple-800 border-purple-300",
      [UserRole.ADMIN]: "bg-red-100 text-red-800 border-red-300",
      [UserRole.PROJECT_PARTNER]: "bg-blue-100 text-blue-800 border-blue-300",
      [UserRole.PRODUCER]: "bg-green-100 text-green-800 border-green-300",
      [UserRole.DELEGATE]: "bg-gray-100 text-gray-800 border-gray-300",
    };
    return colors[role];
  };

  const getRoleDisplayName = (role: UserRole): string => {
    const names: Record<UserRole, string> = {
      [UserRole.SUPER_ADMIN]: "Super Admin",
      [UserRole.ADMIN]: "Admin",
      [UserRole.PROJECT_PARTNER]: "Project Partner",
      [UserRole.PRODUCER]: "Producer",
      [UserRole.DELEGATE]: "Delegate",
    };
    return names[role];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex gap-6">
        {/* Login Form */}
        <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => setShowMockUsers(!showMockUsers)}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {showMockUsers ? "← Hide" : "Show"} test accounts
            </button>
          </div>
        </div>

        {/* Mock Users Panel */}
        {showMockUsers && (
          <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Test Accounts
              </h2>
              <p className="text-sm text-gray-600">
                Click any account to auto-fill credentials
              </p>
            </div>

            <div className="space-y-3">
              {Object.entries(MOCK_USERS).map(([email, data]) => (
                <button
                  key={email}
                  onClick={() => handleQuickLogin(email)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700">
                        {data.user.name}
                      </h3>
                      <p className="text-sm text-gray-600">{email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                        data.user.role
                      )}`}
                    >
                      {getRoleDisplayName(data.user.role)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      Password: {data.password}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                Role Permissions Overview:
              </h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>
                  • <strong>Super Admin:</strong> Full system access
                </li>
                <li>
                  • <strong>Admin:</strong> User & org management
                </li>
                <li>
                  • <strong>Project Partner:</strong> Create projects
                </li>
                <li>
                  • <strong>Producer:</strong> Manage tasks
                </li>
                <li>
                  • <strong>Delegate:</strong> View & comment
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
