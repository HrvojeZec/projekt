import { useAuth } from "../context/AuthContext";

export const usePermission = () => {
  const { hasPermission, hasRole } = useAuth();

  const can = (resource: string, action: string): boolean => {
    return hasPermission(resource, action);
  };

  const canAny = (
    permissions: Array<{ resource: string; action: string }>
  ): boolean => {
    return permissions.some(({ resource, action }) =>
      hasPermission(resource, action)
    );
  };

  const canAll = (
    permissions: Array<{ resource: string; action: string }>
  ): boolean => {
    return permissions.every(({ resource, action }) =>
      hasPermission(resource, action)
    );
  };

  return { can, canAny, canAll, hasRole };
};
