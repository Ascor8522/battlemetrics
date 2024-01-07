import { z } from "zod";
import { idSchema } from "./index";

export class ServerComponent {
	public static readonly serverRelationshipsSchema = z.object({
		id: idSchema,
		type: z.literal("server"),
	});

	public static readonly serverRelationshipsDataSchema = z.object({
		server: z.object({
			data: ServerComponent.serverRelationshipsSchema,
		}),
	});
}
