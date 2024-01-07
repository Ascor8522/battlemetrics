import { z } from "zod";
import { idSchema } from "./index";

export class UserComponent {
	public static readonly userRelationshipsSchema = z.object({
		id: idSchema,
		type: z.literal("user"),
	});

	public static readonly userRelationshipsDataSchema = z.object({
		user: z.object({
			data: UserComponent.userRelationshipsSchema,
		}),
	});

}
