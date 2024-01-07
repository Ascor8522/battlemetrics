import { BanComponent, BanListComponent, OrganizationComponent, PlayerComponent, ServerComponent, UserComponent } from "./components";
import { BaseClient } from "./utils/base-client";

export class BattleMetricsClient extends BaseClient {
	protected static readonly BASE_URL = "https://api.battlemetrics.com/";
	private static readonly RATE_LIMIT_NO_AUTH: [number, number][] = [[60, 60], [15, 1]];
	private static readonly RATE_LIMIT_AUTH: [number, number][] = [[300, 60], [45, 1]];

	public readonly ban: typeof BanComponent;
	public readonly banList: typeof BanListComponent;
	public readonly organization: typeof OrganizationComponent;
	public readonly player: typeof PlayerComponent;
	public readonly server: typeof ServerComponent;
	public readonly user: typeof UserComponent;

	public constructor(apiKey: string | null = null) {
		super(apiKey, BattleMetricsClient.RATE_LIMIT_NO_AUTH, BattleMetricsClient.RATE_LIMIT_AUTH);
		this.ban = BanComponent.bind(this);
		this.banList = BanListComponent.bind(this);
		this.organization = OrganizationComponent.bind(this);
		this.player = PlayerComponent.bind(this);
		this.server = ServerComponent.bind(this);
		this.user = UserComponent.bind(this);
	}

	protected getBaseUrl(): string {
		return BattleMetricsClient.BASE_URL;
	}
}
