import router from '@/router';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { ElMessage } from 'element-plus';
import { debounceManager } from './debounce';

// ==================== 类型定义 ====================

/**
 * 扩展的请求配置接口
 */
interface CustomRequestConfig extends InternalAxiosRequestConfig {
	/** 是否显示 Loading，默认 true */
	showLoading?: boolean;
	/** Loading 提示文字 */
	loadingText?: string;
	/** 防抖时间（毫秒），设置后启用防抖 */
	debounce?: number;
	/** 请求唯一标识，用于防抖和取消 */
	requestKey?: string;
}

// ==================== 请求缓存管理器 ====================

/**
 * 请求缓存管理器
 * 用于存储未完成的请求，实现请求取消功能
 */
class RequestCacheManager {
	private pendingRequests: Map<string, CancelTokenSource> = new Map();

	/**
	 * 生成请求唯一标识
	 * @param config 请求配置
	 * @returns 请求 key
	 */
	generateKey(config: CustomRequestConfig): string {
		const { method, url, params, data } = config;
		return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`;
	}

	/**
	 * 添加待处理的请求
	 * @param key 请求唯一标识
	 * @param cancelToken 取消令牌
	 */
	add(key: string, cancelToken: CancelTokenSource): void {
		// 如果存在相同的未完成请求，先取消它
		if (this.pendingRequests.has(key)) {
			this.cancel(key);
		}
		this.pendingRequests.set(key, cancelToken);
	}

	/**
	 * 取消指定的请求
	 * @param key 请求唯一标识
	 * @param message 取消消息
	 */
	cancel(key: string, message?: string): void {
		const cancelToken = this.pendingRequests.get(key);
		if (cancelToken) {
			cancelToken.cancel(message || '请求已取消');
			this.pendingRequests.delete(key);
		}
	}

	/**
	 * 移除已完成的请求
	 * @param key 请求唯一标识
	 */
	remove(key: string): void {
		this.pendingRequests.delete(key);
	}

	/**
	 * 取消所有待处理的请求
	 */
	cancelAll(): void {
		this.pendingRequests.forEach((cancelToken) => {
			cancelToken.cancel('页面切换，取消所有请求');
		});
		this.pendingRequests.clear();
	}
}

const requestCacheManager = new RequestCacheManager();

// ==================== Axios 实例配置 ====================

const axiosInstance: AxiosInstance = axios.create({
	baseURL: '/api',
	timeout: 8000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
});

// ==================== 请求拦截器 ====================

axiosInstance.interceptors.request.use(
	async (config: CustomRequestConfig) => {
		// 1. Token 处理
		const token = sessionStorage.getItem('token');
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// 2. 生成请求唯一标识
		if (!config.requestKey) {
			config.requestKey = requestCacheManager.generateKey(config);
		}

		// 3. 防抖处理
		if (config.debounce && config.debounce > 0) {
			try {
				await debounceManager.debounce(config.requestKey, config.debounce);
			} catch (error) {
				return Promise.reject(error);
			}
		}

		// 4. 创建取消令牌
		const cancelToken = axios.CancelToken.source();
		config.cancelToken = cancelToken.token;

		// 5. 添加到请求缓存（用于取消重复请求）
		requestCacheManager.add(config.requestKey, cancelToken);

		return config;
	},
	(error) => {
		ElMessage.error('请求发送失败');
		return Promise.reject(error);
	}
);

// ==================== 响应拦截器 ====================

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		const config = response.config as CustomRequestConfig;

		// 1. 从请求缓存中移除
		if (config.requestKey) {
			requestCacheManager.remove(config.requestKey);
		}

		// 2. 业务逻辑处理
		const { code, msg, obj } = response.data;

		if (code === 0 && msg === '未登录') {
			ElMessage.error('请登录');
			sessionStorage.removeItem('token');
			router.push('/login');
			return Promise.reject(new Error(msg));
		}

		if (code === 1 && msg === '登录成功') {
			sessionStorage.setItem('token', obj);
			ElMessage.success('登录成功');
		}

		return response;
	},
	(error) => {
		// 1. 从请求缓存中移除
		if (error.config?.requestKey) {
			requestCacheManager.remove(error.config.requestKey);
		}

		// 2. 如果是取消请求，不显示错误提示
		if (axios.isCancel(error)) {
			console.log('请求已取消:', error.message);
			return Promise.reject(error);
		}

		// 3. 错误处理
		let message = '网络错误，请稍后重试';

		if (error.response) {
			switch (error.response.status) {
				case 400:
					message = '请求参数错误';
					break;
				case 401:
					message = '未授权，请重新登录';
					sessionStorage.removeItem('token');
					router.push('/login');
					break;
				case 403:
					message = '拒绝访问';
					break;
				case 404:
					message = '请求地址不存在';
					break;
				case 500:
					message = '服务器内部错误';
					break;
				case 502:
					message = '网关错误';
					break;
				case 503:
					message = '服务不可用';
					break;
				case 504:
					message = '网关超时';
					break;
				default:
					message = `连接错误 ${error.response.status}`;
			}
		} else if (error.code === 'ECONNABORTED') {
			message = '请求超时，请检查网络连接';
		} else if (error.message.includes('Network Error')) {
			message = '网络连接异常';
		}

		ElMessage.error(message);
		return Promise.reject(error);
	}
);

// ==================== 防抖请求工具函数 ====================

/**
 * 创建防抖请求函数
 * @param fn 请求函数
 * @param delay 防抖延迟时间（毫秒），默认 300ms
 * @returns 防抖后的函数
 */
export function createDebounceRequest<T extends (...args: unknown[]) => Promise<unknown>>(fn: T, delay: number = 300): T {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return ((...args: unknown[]) => {
		return new Promise((resolve, reject) => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(async () => {
				try {
					const result = await fn(...args);
					resolve(result);
				} catch (error) {
					reject(error);
				}
			}, delay);
		});
	}) as T;
}

// ==================== 导出 ====================

export default axiosInstance;
