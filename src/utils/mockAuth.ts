import { type User, UserRole } from "../types/auth";

// Mock users for testing
export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "superadmin@test.com": {
    password: "super123",
    user: {
      id: "1",
      email: "superadmin@test.com",
      name: "Super Admin",
      role: UserRole.SUPER_ADMIN,
      organizationId: "org-1",
      projectIds: ["proj-1", "proj-2", "proj-3"],
    },
  },
  "admin@test.com": {
    password: "admin123",
    user: {
      id: "2",
      email: "admin@test.com",
      name: "Admin User",
      role: UserRole.ADMIN,
      organizationId: "org-1",
      projectIds: ["proj-1", "proj-2"],
    },
  },
  "partner@test.com": {
    password: "partner123",
    user: {
      id: "3",
      email: "partner@test.com",
      name: "Project Partner",
      role: UserRole.PROJECT_PARTNER,
      organizationId: "org-1",
      projectIds: ["proj-1"],
    },
  },
  "producer@test.com": {
    password: "producer123",
    user: {
      id: "4",
      email: "producer@test.com",
      name: "Producer User",
      role: UserRole.PRODUCER,
      organizationId: "org-1",
      projectIds: ["proj-1"],
    },
  },
  "delegate@test.com": {
    password: "delegate123",
    user: {
      id: "5",
      email: "delegate@test.com",
      name: "Delegate User",
      role: UserRole.DELEGATE,
      organizationId: "org-1",
      projectIds: ["proj-1"],
    },
  },
};

// Mock login API
export const mockLogin = async (
  email: string,
  password: string
): Promise<User & { token: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockUser = MOCK_USERS[email.toLowerCase()];

  if (!mockUser) {
    throw new Error("User not found");
  }

  if (mockUser.password !== password) {
    throw new Error("Invalid password");
  }

  // Return user with mock token
  return {
    ...mockUser.user,
    token: `mock-token-${mockUser.user.id}-${Date.now()}`,
  };
};
