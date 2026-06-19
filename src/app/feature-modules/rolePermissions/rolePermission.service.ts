import roleRepo from "../roles/role.repo.js";
import rolePermissionRepo from "./rolePermission.repo.js";
import { RolePermissionResponse } from "./rolePermission.response.js";

// const add = async(id: string, permissions: string[]) => {
//     try {
//         for(let index = 0; index < permissions.length; index++){
//             await rolePermissionRepo.add(id, permissions[index] as string);
//         }
//         return RolePermissionResponse.PERMISSION_ASSIGNED_SUCCESSFULLY;

//     } catch (error) {
//         console.log(error);

//         throw error;
//     }
// }

// export default {
//     add
// }

const add = async (roleId: string, permissionIds: string[]) => {
  try {
    const role = await roleRepo.findById(roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    await rolePermissionRepo.bulkAdd(roleId, permissionIds);

    return RolePermissionResponse.PERMISSION_ASSIGNED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const update = async (roleId: string, permissionIds: string[]) => {
  try {
    const role = await roleRepo.findById(roleId);

    if (!role) {
      throw new Error("Role not found");
    }
    await rolePermissionRepo.deleteByRoleId(roleId);

    await rolePermissionRepo.bulkAdd(roleId, permissionIds);

    return RolePermissionResponse.PERMISSION_ASSIGNED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteByRoleId = async (roleId: string) => {
  try {
    const role = await roleRepo.findById(roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    await rolePermissionRepo.deleteByRoleId(roleId);

    return RolePermissionResponse.PERMISSION_REMOVED_SUCCESSFULLY;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  add,
  update,
  deleteByRoleId
};
