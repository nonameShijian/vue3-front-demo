<template>
	<div class="login-page">
		<!-- 左侧装饰区域（桌面端显示） -->
		<div class="login-banner">
			<div class="banner-content">
				<h1 class="banner-title">欢迎回来</h1>
				<p class="banner-subtitle">登录您的账户以继续</p>
				<div class="banner-illustration">
					<svg viewBox="0 0 200 200" class="illustration-svg">
						<circle cx="100" cy="80" r="40" fill="var(--el-color-primary)" opacity="0.8" />
						<rect x="60" y="130" width="80" height="50" rx="10" fill="var(--el-color-primary)" opacity="0.6" />
						<circle cx="70" cy="70" r="8" fill="white" opacity="0.9" />
						<circle cx="130" cy="70" r="8" fill="white" opacity="0.9" />
					</svg>
				</div>
			</div>
		</div>

		<!-- 右侧登录表单 -->
		<div class="login-form-container">
			<div class="login-form-wrapper">
				<div class="form-header">
					<h2 class="form-title">账户登录</h2>
					<p class="form-subtitle">请输入您的账户信息</p>
				</div>

				<el-form ref="formRef" :model="form" :rules="rules" class="login-form">
					<el-form-item prop="username">
						<el-input
							v-model="form.username"
							placeholder="请输入用户名"
							:size="inputSize"
							:prefix-icon="User"
							clearable
						/>
					</el-form-item>

					<el-form-item prop="password">
						<el-input
							v-model="form.password"
							type="password"
							placeholder="请输入密码"
							:size="inputSize"
							:prefix-icon="Lock"
							show-password
							clearable
						/>
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							:size="buttonSize"
							class="login-button"
							@click="login"
							:loading="loading"
						>
							{{ loading ? '登录中...' : '登 录' }}
						</el-button>
					</el-form-item>

					<div class="form-footer">
						<span class="footer-text">还没有账户？</span>
						<router-link to="/register" class="register-link">立即注册</router-link>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

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
});

// 校验规则
const rules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const login = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				loading.value = true;
				console.log(form);
				// 模拟登录请求
				setTimeout(() => {
					loading.value = false;
					ElMessage.success('登录成功');
					router.push('/');
				}, 1000);
			} else {
				ElMessage.error('请完善表单信息');
			}
		});
	}
};
</script>

<style scoped>
.login-page {
	display: flex;
	min-height: calc(100vh - 60px);
	background: linear-gradient(135deg, var(--el-color-primary-light-9) 0%, var(--el-bg-color-page) 100%);
}

/* 左侧装饰区域 */
.login-banner {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
	background: linear-gradient(135deg, var(--el-color-primary) 0%, var(--el-color-primary-light-3) 100%);
	position: relative;
	overflow: hidden;
}

.login-banner::before {
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
	0%, 100% {
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
.login-form-container {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
}

.login-form-wrapper {
	width: 100%;
	max-width: 400px;
	background: var(--el-bg-color);
	border-radius: 16px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
	padding: 40px;
	transition: all 0.3s ease;
}

.login-form-wrapper:hover {
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

.login-form {
	margin-top: 24px;
}

.login-form :deep(.el-form-item) {
	margin-bottom: 24px;
}

.login-form :deep(.el-input__wrapper) {
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	transition: all 0.3s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.login-button {
	width: 100%;
	border-radius: 8px;
	font-size: 16px;
	font-weight: 500;
	height: 44px;
	transition: all 0.3s ease;
}

.login-button:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
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

.register-link {
	color: var(--el-color-primary);
	text-decoration: none;
	font-weight: 500;
	margin-left: 8px;
	transition: all 0.3s ease;
}

.register-link:hover {
	color: var(--el-color-primary-light-3);
	text-decoration: underline;
}

/* 移动端和横屏适配 */
@media (max-width: 768px), (max-height: 500px) and (orientation: landscape) {
	.login-page {
		flex-direction: column;
	}

	.login-banner {
		display: none;
	}

	.login-form-container {
		padding: 12px;
		height: calc(100vh - 60px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.login-form-wrapper {
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

	.login-form {
		margin-top: 16px;
	}

	.login-form :deep(.el-form-item) {
		margin-bottom: 12px;
	}

	.login-form :deep(.el-input__wrapper) {
		padding: 8px 12px;
	}

	.login-button {
		height: 40px;
		font-size: 14px;
		margin-top: 8px;
	}

	.form-footer {
		margin-top: 12px;
		padding-top: 12px;
	}

	.footer-text,
	.register-link {
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

	.login-form-wrapper {
		max-width: 360px;
		padding: 32px;
	}
}

/* 深色模式优化 */
html.dark .login-page {
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

html.dark .login-form-wrapper {
	background: rgba(30, 30, 46, 0.95);
	backdrop-filter: blur(10px);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

html.dark .login-banner {
	background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
}
</style>
