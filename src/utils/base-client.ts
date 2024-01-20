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

	/**
	 * Makes a request to the BattleMetrics API, reads the JSON response, and validates it against the given schema.
	 *
	 * @param path The path to make the request to
	 * @param schema The schema to validate the response against
	 * @param options The options to pass to fetch
	 * @returns The parsed response
	 */
	public async getJSON<T>(path: string, schema: z.ZodType<T, any, any>, options: RequestInit = {}): Promise<T> {
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

	/**
	 *
	 * @param path
	 * @param schema
	 * @param param2
	 * @returns
	 */
	public async postJSON<T>(path: string, schema: z.ZodType<T, any, any>, { body, ...options }: RequestInit = {}): Promise<T> {
		const doFetch = () => fetch(path, {
			...options,
			headers: {
				...options.headers,
				"Authorization": `Bearer ${this.apiKey}`,
			},
			body: body !== undefined ? JSON.stringify(body) : undefined,
		})
			.then((response) => response.json() as Promise<T>)
			.then(schema.parse);
		return this.scheduler.schedule(doFetch);
	}

	/**
	 * Makes a request to the BattleMetrics API, reads the text response, and returns it.
	 * @private Should only be used internally
	 *
	 * @param path The path to make the request to
	 * @param options The options to pass to fetch
	 * @returns The response
	 */
	public async getText<T>(path: string, options: RequestInit = {}): Promise<T> {
		const doFetch = () => fetch(path, {
			...options,
			headers: {
				...options.headers,
				"Authorization": `Bearer ${this.apiKey}`,
			},
		})
			.then((response) => response.text() as Promise<T>);
		return this.scheduler.schedule(doFetch);
	}
}
