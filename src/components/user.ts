import { z } from "zod";
import { idSchema } from "./index";

export const userRelationshipsSchema = z.object({
	id: idSchema,
	type: z.literal("user"),
});

export const userRelationshipsDataSchema = z.object({
	user: z.object({
		data: userRelationshipsSchema,
	}),
});
