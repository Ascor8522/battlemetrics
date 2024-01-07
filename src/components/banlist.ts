import { z } from "zod";
import { idSchema } from "./index";

export class BanListComponent {
	public static readonly banListRelationshipsSchema = z.object({
		id: idSchema,
		type: z.literal("banList"),
	});

	public static readonly banListRelationshipsDataSchema = z.object({
		banList: z.object({
			data: BanListComponent.banListRelationshipsSchema,
		}),
	});
}
