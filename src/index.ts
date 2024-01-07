export * from "./client";
export * from "./components";
export * from "./model";

import { BattleMetricsClient } from "./client";

const client = new BattleMetricsClient();

const bans = await client.ban.getBans();
