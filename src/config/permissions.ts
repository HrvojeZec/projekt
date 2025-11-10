import { UserRole } from "../types/auth";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 5,
  [UserRole.ADMIN]: 4,
  [UserRole.PROJECT_PARTNER]: 3,
  [UserRole.PRODUCER]: 2,
  [UserRole.DELEGATE]: 1,
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.SUPER_ADMIN]: [
    "users:*",
    "projects:*",
    "organizations:*",
    "settings:*",
    "reports:*",
    "analytics:*",
    "billing:*",
    "audit:*",
  ],

  [UserRole.ADMIN]: [
    "users:read",
    "users:create",
    "users:update",
    "projects:*",
    "organizations:read",
    "organizations:update",
    "settings:read",
    "settings:update",
    "reports:*",
    "analytics:read",
  ],

  [UserRole.PROJECT_PARTNER]: [
    "projects:read",
    "projects:create",
    "projects:update",
    "users:read",
    "reports:read",
    "reports:create",
    "analytics:read",
  ],

  [UserRole.PRODUCER]: [
    "projects:read",
    "projects:update",
    "tasks:*",
    "files:*",
    "comments:*",
    "reports:read",
  ],

  [UserRole.DELEGATE]: [
    "projects:read",
    "tasks:read",
    "tasks:update",
    "files:read",
    "comments:read",
    "comments:create",
  ],
};

// Route access configuration
export const ROUTE_ACCESS: Record<string, UserRole[]> = {
  "/dashboard": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
    UserRole.PRODUCER,
    UserRole.DELEGATE,
  ],

  "/super-admin": [UserRole.SUPER_ADMIN],
  "/super-admin/*": [UserRole.SUPER_ADMIN],

  "/admin": [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  "/admin/*": [UserRole.SUPER_ADMIN, UserRole.ADMIN],

  "/users": [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  "/users/*": [UserRole.SUPER_ADMIN, UserRole.ADMIN],

  "/projects": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
    UserRole.PRODUCER,
  ],
  "/projects/create": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
  ],
  "/projects/:id": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
    UserRole.PRODUCER,
    UserRole.DELEGATE,
  ],

  "/reports": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
    UserRole.PRODUCER,
  ],
  "/reports/create": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
  ],

  "/analytics": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
  ],

  "/settings": [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  "/settings/organization": [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  "/settings/billing": [UserRole.SUPER_ADMIN],

  "/profile": [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.PROJECT_PARTNER,
    UserRole.PRODUCER,
    UserRole.DELEGATE,
  ],
};
