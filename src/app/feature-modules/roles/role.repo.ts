import { Role } from "./role.schema.js";
import type { role } from "./role.types.js";

const add = (role: Omit<role, "id">) => Role.create(role);

const findById = (id: string) => Role.findByPk(id);


export default{
    add,
    findById
}