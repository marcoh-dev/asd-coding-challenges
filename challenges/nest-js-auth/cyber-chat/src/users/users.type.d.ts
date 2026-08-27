import { User } from "./entities/user.entity";
export type TSafeUser = Omit<User, "passwordHash">;
