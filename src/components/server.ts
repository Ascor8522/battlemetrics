import { z } from "zod";
import { idSchema } from "./index";

export const serverRelationshipsSchema = z.object({
	id: idSchema,
	type: z.literal("server"),
});

export const serverRelationshipsDataSchema = z.object({
	server: z.object({
		data: serverRelationshipsSchema,
	}),
});
