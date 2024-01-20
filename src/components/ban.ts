import { z } from "zod";
import { BattleMetricsClient } from "../index";
import { banListRelationshipsDataSchema } from "./banlist";
import { idSchema } from "./index";
import { organizationRelationshipsDataSchema } from "./organization";
import { playerRelationshipsDataSchema } from "./player";
import { serverRelationshipsDataSchema } from "./server";
import { userRelationshipsDataSchema } from "./user";

export const banRelationshipsSchema = z.object({
	id: z.string().uuid(),
	type: z.literal("ban"),
});

export const banRelationshipsDataSchema = z.object({
	ban: z.object({
		data: banRelationshipsSchema,
	}),
});

export const banSchema = z.object({
	attributes: z.object({
		autoAddEnabled: z.boolean(),
		expires: z.coerce.date().nullable(),
		id: idSchema,
		identifiers: z.tuple([
			z.number().int().positive(),
			z.object({
				type: z.string().min(1),
				identifier: idSchema,
				manual: z.boolean(),
			}),
		]),
		nativeEnabled: z.boolean().nullable(),
		note: z.string().nullable(),
		orgWide: z.boolean(),
		reason: z.string().min(1).max(255),
		timestamp: z.coerce.date(),
		uid: z.string().min(5).max(14),
	}),
	relationships: z
		.object({})
		.merge(banListRelationshipsDataSchema)
		.merge(organizationRelationshipsDataSchema)
		.merge(playerRelationshipsDataSchema)
		.merge(serverRelationshipsDataSchema)
		.merge(userRelationshipsDataSchema),
})
	.merge(banRelationshipsSchema);

export const banExportEnumSchema = z.enum([
	"arma2/bans.txt",
	"arma3/bans.txt",
	"squad/Bans.cfg",
	"ark/banlist.txt",
	"rust/bans.cfg",
	"rust/bansip_SERVER.ini",
]);

/**
 * List, search and filter existing bans.
 * By default only ban information is included.
 * If you wish to included server and player information be sure to request the needed information.
 *
 * Scope:
 * Requires the ban:read scope.
 */
export function getBans(this: BattleMetricsClient) {
	const schema = z.object({
		meta: z.object({
			active: z.number().int().positive(),
			expired: z.number().int().positive(),
			total: z.number().int().positive(),
		}),
		links: z.record(z.unknown()),
		data: z.array(banSchema),
		included: z.array(z.unknown()),
	});
	return this.client.getJSON(this.getFullURL("/bans"), schema);
};

const createBanSchema = banSchema.pick({ attributes: true });

/**
 * Create a new ban.
 * After creating the ban BattleMetrics will scan all servers that the ban applies to and kick matching players.
 *
 * Scope:
 * Requires the ban:create scope.
 * If you do not have the ban:read scope you will receive an empty response.
 */
export function createBan(this: BattleMetricsClient, ban: z.infer<typeof createBanSchema>) {
	const schema = z.object({
		data: banSchema,
	});
	return this.client.postJSON(this.getFullURL("/bans"), schema, { body: ban });
}

/**
 * Allows you to add multiple bans at once.
 * This method of adding bans has a few limitations.
 * - It will not kick players already online.
 * - It will not log each ban to server activity.
 * - The bans will not immediately be available in search.
 *
 * Scope:
 * Requires the ban:import scope.
 * If you do not have the ban:read scope you will receive an empty or partial response.
 */
export function importBans(this: BattleMetricsClient, ban: {}) {
	const schema = banSchema;
	return this.client.getJSON(this.getFullURL("/bans/import"), schema, { method: "POST", body });
}

/**
 * Allows you to export your bans to multiple game formats.
 * Some formats do not support as much information as the BattleMetrics ban system.
 * Exports will contain as much information as possible.
 * - arma2/bans.txt: Only supports ip and BE GUID bans.
 * - arma3/bans.txt: Only supports ip and BE GUID bans.
 * - squad/Bans.cfg: Only supports Steam ID bans.
 * - ark/banlist.txt: Only supports Steam ID bans.
 * - rust/bans.cfg: Only supports Steam ID bans.
 * - rust/bansip_SERVER.ini: Only supports IP bans.
 *
 * Scope:
 * Requires the ban:export scope.
 */
export function exportBans(this: BattleMetricsClient, format: z.infer<typeof banExportEnumSchema>, { organization, server }: { organization: string; server: string; }) {
	const parameters = {
		format,
		"filter[organization]": organization,
		"filter[server]": server,
	};
	return this.client.getText<string>(this.getFullURL("/bans/export", parameters), { method: "POST", });
}
