import { z } from "zod";
import { idSchema } from "./index";

export const playerRelationshipsSchema = z.object({
	id: idSchema,
	type: z.literal("player"),
});

export const playerRelationshipsDataSchema = z.object({
	player: z.object({
		data: playerRelationshipsSchema,
	}),
});
