import { hashPassword } from "../../utilities/hash-password.js";
import userRepo from "./user.repo.js";
import { UserResponse } from "./user.response.js";
import type { User } from "./user.types.js";

const add = async(user: Omit<User, "id">) => {
    try {
        await userRepo.add(user);
        return UserResponse.USER_CREATED;
        
    } catch (error) {
        throw error;
    }
}

const find = async(email: string) => {
    try {
        const user = await userRepo.findOne(email);
        return user
        
    } catch (error) {
        throw error;
    }
}

const update = async(id: string, user: Partial<User>) => {
    try {
        const result = await userRepo.update(id, user);
        return UserResponse.USER_UPDATED;
    } catch (error) {
        throw error;
    }
}

export default{
    add,
    update,
    find
}