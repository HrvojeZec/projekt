export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  PROJECT_PARTNER = "project_partner",
  PRODUCER = "producer",
  DELEGATE = "delegate",
}

export interface Permission {
  resource: string;
  actions: ("create" | "read" | "update" | "delete")[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions?: Permission[];
  organizationId?: string;
  projectIds?: string[];
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  hasPermission: (resource: string, action: string) => boolean;
}
