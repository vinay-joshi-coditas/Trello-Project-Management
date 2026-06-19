import permissionRepo from "./permission.repo.js";
import { PermissionResponse } from "./permission.response.js";
import type { permission } from "./permission.types.js";

const add = async (permission: Omit<permission, "id">) => {
    try {
        await permissionRepo.add(permission);
        return PermissionResponse.PERMISSION_CREATED;
    } catch (error) {
        throw error;
    }
}

export default {
    add
}