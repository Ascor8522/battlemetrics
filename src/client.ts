import { ban, banlist, organization, player, server, user } from "./components/index";
import { BaseClient } from "./utils/base-client";

export class BattleMetricsClient {
	protected static readonly BASE_URL = "https://api.battlemetrics.com/";
	protected static readonly RATE_LIMIT_NO_AUTH: [number, number][] = [[60, 60], [15, 1]];
	protected static readonly RATE_LIMIT_AUTH: [number, number][] = [[300, 60], [45, 1]];

	public readonly ban = ban;
	public readonly banlist = banlist;
	public readonly organization = organization;
	public readonly player = player;
	public readonly server = server;
	public readonly user = user;

	protected client: BaseClient;

	public constructor(apiKey: string | null = null) {
		this.client = new BaseClient(apiKey, BattleMetricsClient.RATE_LIMIT_NO_AUTH, BattleMetricsClient.RATE_LIMIT_AUTH);

		Object.assign(this.ban, ban);
		Object.assign(this.banlist, banlist);
		Object.assign(this.organization, organization);
		Object.assign(this.player, player);
		Object.assign(this.server, server);
		Object.assign(this.user, user);
	}

	protected getBaseUrl(): string {
		return BattleMetricsClient.BASE_URL;
	}

	protected getFullURL(path: string, parameters: Record<string, string> = {}): string {
		const searchParams = new URLSearchParams(parameters);
		const url = new URL(this.getBaseUrl() + path + "?" + searchParams.toString());
		return url.toString();
	}
}
