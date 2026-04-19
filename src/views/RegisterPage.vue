<template>
	<div class="register-page">
		<!-- 左侧装饰区域（桌面端显示） -->
		<div class="register-banner">
			<div class="banner-content">
				<h1 class="banner-title">加入我们</h1>
				<p class="banner-subtitle">创建您的账户开始体验</p>
				<div class="banner-illustration">
					<svg viewBox="0 0 200 200" class="illustration-svg">
						<circle cx="100" cy="70" r="35" fill="var(--el-color-primary)" opacity="0.8" />
						<path d="M65 120 Q100 100 135 120 L135 160 Q100 180 65 160 Z" fill="var(--el-color-primary)" opacity="0.6" />
						<circle cx="85" cy="65" r="6" fill="white" opacity="0.9" />
						<circle cx="115" cy="65" r="6" fill="white" opacity="0.9" />
						<path d="M90 80 Q100 90 110 80" stroke="white" stroke-width="3" fill="none" opacity="0.9" />
					</svg>
				</div>
			</div>
		</div>

		<!-- 右侧注册表单 -->
		<div class="register-form-container">
			<div class="register-form-wrapper">
				<div class="form-header">
					<h2 class="form-title">创建账户</h2>
					<p class="form-subtitle">填写以下信息完成注册</p>
				</div>

				<el-form ref="formRef" :model="form" :rules="rules" class="register-form">
					<el-form-item prop="username">
						<el-input v-model="form.username" placeholder="请输入用户名" :size="inputSize" :prefix-icon="User" clearable />
					</el-form-item>

					<el-form-item prop="email">
						<el-input v-model="form.email" placeholder="请输入邮箱地址" :size="inputSize" :prefix-icon="Message" clearable />
					</el-form-item>

					<el-form-item prop="password">
						<el-input
							v-model="form.password"
							type="password"
							placeholder="请输入密码（6-20位）"
							:size="inputSize"
							:prefix-icon="Lock"
							show-password
							clearable
						/>
					</el-form-item>

					<el-form-item prop="confirmPassword">
						<el-input
							v-model="form.confirmPassword"
							type="password"
							placeholder="请再次输入密码"
							:size="inputSize"
							:prefix-icon="Lock"
							show-password
							clearable
						/>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" :size="buttonSize" class="register-button" @click="register" :loading="loading">
							{{ loading ? '注册中...' : '注 册' }}
						</el-button>
					</el-form-item>

					<div class="form-footer">
						<span class="footer-text">已有账户？</span>
						<router-link to="/login" class="login-link">立即登录</router-link>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElMessage, FormItemRule } from 'element-plus';
import { Arrayable } from 'element-plus/es/utils/typescript.mjs';
import { User, Lock, Message } from '@element-plus/icons-vue';

const router = useRouter();
const formRef = ref<InstanceType<typeof ElForm>>();
const loading = ref(false);

// 响应式尺寸
const isMobile = computed(() => window.innerWidth < 768);
const inputSize = computed(() => (isMobile.value ? 'large' : 'default'));
const buttonSize = computed(() => (isMobile.value ? 'large' : 'default'));

const form = reactive({
	username: '',
	password: '',
	confirmPassword: '',
	email: '',
});

// 校验规则
const rules: Partial<Record<string, Arrayable<FormItemRule>>> = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
	],
	confirmPassword: [
		{ required: true, message: '请再次输入密码', trigger: 'blur' },
		{
			validator: (_rule, value, callback) => {
				if (value !== form.password) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			},
			trigger: 'blur',
		},
	],
	email: [
		{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
		{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
	],
};

const register = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				loading.value = true;
				console.log(form);
				// 模拟注册请求
				setTimeout(() => {
					loading.value = false;
					ElMessage.success('注册成功');
					router.push('/login');
				}, 1000);
			} else {
				ElMessage.error('请完善表单信息');
			}
		});
	}
};
</script>

<style scoped>
.register-page {
	display: flex;
	min-height: calc(100vh - 60px);
	background: linear-gradient(135deg, var(--el-color-primary-light-9) 0%, var(--el-bg-color-page) 100%);
}

/* 左侧装饰区域 */
.register-banner {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
	background: linear-gradient(135deg, var(--el-color-success) 0%, var(--el-color-success-light-3) 100%);
	position: relative;
	overflow: hidden;
}

.register-banner::before {
	content: '';
	position: absolute;
	top: -50%;
	right: -50%;
	width: 200%;
	height: 200%;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
	animation: pulse 15s ease-in-out infinite;
}

@keyframes pulse {
	0%,
	100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
}

.banner-content {
	text-align: center;
	color: white;
	position: relative;
	z-index: 1;
}

.banner-title {
	font-size: 48px;
	font-weight: bold;
	margin-bottom: 16px;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.banner-subtitle {
	font-size: 18px;
	opacity: 0.9;
	margin-bottom: 40px;
}

.banner-illustration {
	width: 200px;
	height: 200px;
	margin: 0 auto;
}

.illustration-svg {
	width: 100%;
	height: 100%;
	filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

/* 右侧表单区域 */
.register-form-container {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
}

.register-form-wrapper {
	width: 100%;
	max-width: 450px;
	background: var(--el-bg-color);
	border-radius: 16px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
	padding: 40px;
	transition: all 0.3s ease;
}

.register-form-wrapper:hover {
	box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
	transform: translateY(-2px);
}

.form-header {
	text-align: center;
	margin-bottom: 32px;
}

.form-title {
	font-size: 28px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin-bottom: 8px;
}

.form-subtitle {
	font-size: 14px;
	color: var(--el-text-color-secondary);
}

.register-form {
	margin-top: 24px;
}

.register-form :deep(.el-form-item) {
	margin-bottom: 20px;
}

.register-form :deep(.el-input__wrapper) {
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	transition: all 0.3s ease;
}

.register-form :deep(.el-input__wrapper:hover) {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.register-button {
	width: 100%;
	border-radius: 8px;
	font-size: 16px;
	font-weight: 500;
	height: 44px;
	background: linear-gradient(135deg, var(--el-color-success) 0%, var(--el-color-success-light-3) 100%);
	border: none;
	transition: all 0.3s ease;
}

.register-button:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(103, 194, 58, 0.4);
}

.form-footer {
	text-align: center;
	margin-top: 24px;
	padding-top: 24px;
	border-top: 1px solid var(--el-border-color-lighter);
}

.footer-text {
	color: var(--el-text-color-secondary);
	font-size: 14px;
}

.login-link {
	color: var(--el-color-success);
	text-decoration: none;
	font-weight: 500;
	margin-left: 8px;
	transition: all 0.3s ease;
}

.login-link:hover {
	color: var(--el-color-success-light-3);
	text-decoration: underline;
}

/* 移动端和横屏适配 */
@media (max-width: 768px), (max-height: 500px) and (orientation: landscape) {
	.register-page {
		flex-direction: column;
	}

	.register-banner {
		display: none;
	}

	.register-form-container {
		padding: 12px;
		height: calc(100vh - 60px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.register-form-wrapper {
		padding: 20px 16px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
		width: 100%;
		max-width: 400px;
	}

	.form-header {
		margin-bottom: 16px;
	}

	.form-title {
		font-size: 20px;
		margin-bottom: 4px;
	}

	.form-subtitle {
		font-size: 12px;
	}

	.register-form {
		margin-top: 16px;
	}

	.register-form :deep(.el-form-item) {
		margin-bottom: 12px;
	}

	.register-form :deep(.el-input__wrapper) {
		padding: 8px 12px;
	}

	.register-button {
		height: 40px;
		font-size: 14px;
		margin-top: 8px;
	}

	.form-footer {
		margin-top: 12px;
		padding-top: 12px;
	}

	.footer-text,
	.login-link {
		font-size: 13px;
	}
}

/* 平板适配 */
@media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {
	.banner-title {
		font-size: 36px;
	}

	.banner-illustration {
		width: 150px;
		height: 150px;
	}

	.register-form-wrapper {
		max-width: 400px;
		padding: 32px;
	}
}

/* 深色模式优化 */
html.dark .register-page {
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

html.dark .register-form-wrapper {
	background: rgba(30, 30, 46, 0.95);
	backdrop-filter: blur(10px);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

html.dark .register-banner {
	background: linear-gradient(135deg, #1a4731 0%, #16213e 100%);
}
</style>
