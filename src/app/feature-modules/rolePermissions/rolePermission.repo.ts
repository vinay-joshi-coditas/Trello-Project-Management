import { RolePermission } from "./rolePermission.schema.js";

const add = (roleId: string, permissionId: string) =>
  RolePermission.create({
    role_id: roleId,
    permission_id: permissionId,
  });

const bulkAdd = (roleId: string, permissionIds: string[]) =>
  RolePermission.bulkCreate(
    permissionIds.map((permissionId) => ({
      role_id: roleId,
      permission_id: permissionId,
    }))
  );

const deleteByRoleId = (roleId: string) =>
  RolePermission.destroy({
    where: {
      role_id: roleId,
    },
  });

export default {
  add,
  bulkAdd,
  deleteByRoleId,
};
