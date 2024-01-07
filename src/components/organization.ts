import { z } from "zod";
import { idSchema } from "./index";

export class OrganizationComponent {
	public static readonly organizationRelationshipsSchema = z.object({
		id: idSchema,
		type: z.literal("organization"),
	});

	public static readonly organizationRelationshipsDataSchema = z.object({
		organization: z.object({
			data: OrganizationComponent.organizationRelationshipsSchema,
		}),
	});
}
