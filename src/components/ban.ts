import { z } from "zod";
import { BattleMetricsClient, idSchema, } from "..";
import { BanListComponent } from "./banlist";
import { OrganizationComponent } from "./organization";
import { PlayerComponent } from "./player";
import { ServerComponent } from "./server";
import { UserComponent } from "./user";

export class BanComponent {

	public static readonly banRelationshipsSchema = z.object({
		id: z.string().uuid(),
		type: z.literal("ban"),
	});

	public static readonly banRelationshipsDataSchema = z.object({
		ban: z.object({
			data: BanComponent.banRelationshipsSchema,
		}),
	});

	public static readonly banSchema = z.object({
		attributes: z.object({
			autoAddEnabled: z.boolean(),
			expires: z.coerce.date().nullable(),
			id: idSchema,
			identifiers: z.array(z.union([
				z.number().int().positive(),
				z.object({
					type: z.string().min(1),
					identifier: idSchema,
					manual: z.boolean(),
				}),
			])),
			nativeEnabled: z.boolean().nullable(),
			note: z.string().nullable(),
			orgWide: z.boolean(),
			reason: z.string().min(1).max(255),
			timestamp: z.coerce.date(),
			uid: z.string().min(5).max(14),
		}),
		relationships: z
			.object({})
			.and(BanListComponent.banListRelationshipsDataSchema)
			.and(OrganizationComponent.organizationRelationshipsDataSchema)
			.and(PlayerComponent.playerRelationshipsDataSchema)
			.and(ServerComponent.serverRelationshipsDataSchema)
			.and(UserComponent.userRelationshipsDataSchema),
	})
		.and(BanComponent.banRelationshipsSchema);

	public static getBans(this: BattleMetricsClient) {
		const schema = z.object({
			meta: z.object({
				active: z.number().int().positive(),
				expired: z.number().int().positive(),
				total: z.number().int().positive(),
			}),
			links: z.record(z.unknown()),
			data: z.array(BanComponent.banSchema),
			included: z.array(z.unknown()),
		});
		return this.jsonRequest(this.getBaseUrl() + "/bans", schema);
	}

	public static createBan(this: BattleMetricsClient) {

	}

}
