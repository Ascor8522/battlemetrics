import { z } from "zod";
import { idSchema } from "./index";

export const banListRelationshipsSchema = z.object({
	id: idSchema,
	type: z.literal("banList"),
});

export const banListRelationshipsDataSchema = z.object({
	banList: z.object({
		data: banListRelationshipsSchema,
	}),
});
