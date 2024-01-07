import { z } from "zod";
export * from "./ban";
export * from "./banlist";
export * from "./organization";
export * from "./player";
export * from "./server";
export * from "./user";

export const idSchema = z.string().min(1);
