// ==================== 防抖管理器 ====================

/**
 * 防抖请求管理器
 * 用于存储和管理防抖定时器
 */
export class DebounceManager {
	private timers: Map<string, ReturnType<typeof setTimeout>> = new Map();
	private resolvers: Map<string, (value: unknown) => void> = new Map();
	private rejectors: Map<string, (reason?: unknown) => void> = new Map();

	/**
	 * 清除指定 key 的防抖定时器
	 */
	clear(key: string): void {
		const timer = this.timers.get(key);
		if (timer) {
			clearTimeout(timer);
			this.timers.delete(key);
		}

		// 拒绝之前的 Promise
		const rejector = this.rejectors.get(key);
		if (rejector) {
			rejector('请求被新的请求取代');
			this.rejectors.delete(key);
			this.resolvers.delete(key);
		}
	}

	/**
	 * 设置防抖
	 */
	debounce(key: string, delay: number): Promise<void> {
		return new Promise((resolve, reject) => {
			// 清除之前的定时器
			this.clear(key);

			// 保存 resolve 和 reject
			this.resolvers.set(key, resolve as (value: unknown) => void);
			this.rejectors.set(key, reject);

			// 设置新的定时器
			const timer = setTimeout(() => {
				this.timers.delete(key);
				this.resolvers.delete(key);
				this.rejectors.delete(key);
				resolve();
			}, delay);

			this.timers.set(key, timer);
		});
	}

	/**
	 * 清除所有防抖定时器
	 */
	clearAll(): void {
		this.timers.forEach((timer) => clearTimeout(timer));
		this.timers.clear();
		this.resolvers.clear();
		this.rejectors.clear();
	}
}

export const debounceManager = new DebounceManager();
