import { z } from "zod";
import { idSchema } from "./index";

export class PlayerComponent {
	public static readonly playerRelationshipsSchema = z.object({
		id: idSchema,
		type: z.literal("player"),
	});

	public static readonly playerRelationshipsDataSchema = z.object({
		player: z.object({
			data: PlayerComponent.playerRelationshipsSchema,
		}),
	});
}
