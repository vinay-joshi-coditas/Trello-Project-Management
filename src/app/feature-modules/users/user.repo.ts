import { Users } from "./user.schema.js";
import type { User } from "./user.types.js";

const findOne = async (email: string): Promise<User | null> =>
  await Users.findOne({ where: { email } });


const add = (user: Omit<User, "id">) => Users.create(user);


const update = (id: string, user: Omit<Partial<User>, "id">) => Users.update(user, { where: { id } }); 

export default {
  findOne,
  add,
  update
};
