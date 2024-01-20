import { z } from "zod";
import { idSchema } from "./index";

export const organizationRelationshipsSchema = z.object({
	id: idSchema,
	type: z.literal("organization"),
});

export const organizationRelationshipsDataSchema = z.object({
	organization: z.object({
		data: organizationRelationshipsSchema,
	}),
});
