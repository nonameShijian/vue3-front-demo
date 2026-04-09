import axiosInstance from './axios';

/**
 * GET 请求
 */
export function get<T = unknown>(url: string, params?: Record<string, unknown>) {
	return axiosInstance.get<T>(url, { params });
}

/**
 * POST 请求
 */
export function post<T = unknown>(url: string, data?: Record<string, unknown>) {
	return axiosInstance.post<T>(url, data);
}

/**
 * PUT 请求
 */
export function put<T = unknown>(url: string, data?: Record<string, unknown>) {
	return axiosInstance.put<T>(url, data);
}

/**
 * DELETE 请求
 */
export function del<T = unknown>(url: string, params?: Record<string, unknown>) {
	return axiosInstance.delete<T>(url, { params });
}

/**
 * 上传文件
 */
export function upload<T = unknown>(url: string, file: File, fieldName = 'file') {
	const formData = new FormData();
	formData.append(fieldName, file);
	return axiosInstance.post<T>(url, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

/**
 * 下载文件
 */
export function download(url: string, filename?: string) {
	return axiosInstance
		.get(url, {
			responseType: 'blob',
		})
		.then((response) => {
			const blob = new Blob([response.data]);
			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.download = filename || 'download';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(downloadUrl);
		});
}
