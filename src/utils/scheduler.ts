export class Scheduler {
	public constructor(
		private readonly delays: [number, number][],
	) { }

	public schedule<T>(fn: () => Promise<T>): Promise<T> {
		const timeout = 0; // TODO: Implement
		return new Promise<T>((resolve) => setTimeout(() => fn().then(resolve), timeout));
	}
}
