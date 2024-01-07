import { z } from "zod";
import { Scheduler } from "./scheduler";

export class BaseClient {
	private scheduler: Scheduler;

	public constructor(
		private apiKey: string | null = null,
		private rateNoAuth: [number, number][] = [],
		private rateAuth: [number, number][] = [],
	) {
		this.scheduler = new Scheduler(this.getRateLimit());
	}

	public setAPIKey(apiKey: string | null): void {
		this.apiKey = apiKey;
	}

	public setRateLimitNoAuth(rateLimit: [number, number][]): void {
		this.rateNoAuth = rateLimit;
		this.scheduler = new Scheduler(this.getRateLimit());
	}

	public setRateLimitAuth(rateLimit: [number, number][]): void {
		this.rateAuth = rateLimit;
		this.scheduler = new Scheduler(this.getRateLimit());
	}

	private isAuth(): boolean {
		return this.apiKey !== null;
	}

	private getRateLimit(): [number, number][] {
		return this.isAuth() ? this.rateAuth : this.rateNoAuth;
	}

	protected async jsonRequest<T>(path: string, schema: z.ZodType<T, any, any>, options: RequestInit = {}): Promise<T> {
		const doFetch = () => fetch(path, {
			...options,
			headers: {
				...options.headers,
				"Authorization": `Bearer ${this.apiKey}`,
			},
		})
			.then((response) => response.json() as Promise<T>)
			.then(schema.parse);
		return this.scheduler.schedule(doFetch);
	}
}
