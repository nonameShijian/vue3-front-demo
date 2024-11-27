import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";

const axiosInstance = axios.create({baseURL: '/api', timeout: 8000});

// 请求配置
axiosInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
});

// 响应配置
axiosInstance.interceptors.response.use(res => {
    if (res?.data?.code === 0 && res.data.msg === '未登录') {
        ElMessage.error("请登录");
        router.push('/login');
    }
    if (res?.data?.code === 1 && res.data.msg === '登录成功') {
        sessionStorage.setItem("token", res.data.obj);
    }
    return res;
});

export default axiosInstance;
