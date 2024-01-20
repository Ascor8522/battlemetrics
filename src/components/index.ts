import { z } from "zod";

export * as ban from "./ban";
export * as banlist from "./banlist";
export * as organization from "./organization";
export * as player from "./player";
export * as server from "./server";
export * as user from "./user";

export const idSchema = z.string().min(1);
