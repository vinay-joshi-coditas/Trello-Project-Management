import z from "zod";

export const ZRolePermission = z.object({
  id: z.string(),
  role_id: z.string(),
  permission_id: z.string(),
});

export const ZAssignPermissions = z.object({
  permissionIds: z.array(z.string()),
});

export type rolePermission = z.infer<typeof ZRolePermission>;
