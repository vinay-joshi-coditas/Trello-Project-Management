import roleRepo from "./role.repo.js";
import { RoleResponse } from "./role.response.js";
import type { role } from "./role.types.js"

const add = async(role: Omit<role, "id">) => {
    try {
        await roleRepo.add(role);
        return RoleResponse.ROLE_CREATED_SUCCESSFULLY;
    } catch (error) {
        throw error;
    }
}

export default{
    add
}