import { Permission } from "./permission.schema.js";
import type { permission } from "./permission.types.js";

const add = (permission: Omit<permission, "id">) => Permission.create(permission);


export default{
    add
}