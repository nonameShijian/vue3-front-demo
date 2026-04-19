<template>
	<div class="home-page">
		<!-- 欢迎区域 -->
		<section class="hero-section">
			<div class="hero-content">
				<h1 class="hero-title">Vue3 Front Demo</h1>
				<p class="hero-subtitle">现代化的 Vue 3 前端演示项目</p>
				<div class="tech-badges">
					<span class="badge">Vue 3</span>
					<span class="badge">TypeScript</span>
					<span class="badge">Vite</span>
					<span class="badge">Element Plus</span>
					<span class="badge">Pinia</span>
					<span class="badge">Electron</span>
					<span class="badge">Capacitor</span>
				</div>
			</div>
		</section>

		<!-- 功能卡片区域 -->
		<section class="features-section">
			<h2 class="section-title">快速开始</h2>
			<div class="cards-grid">
				<!-- 登录卡片 -->
				<div class="feature-card" @click="goToLogin">
					<div class="card-icon login-icon">
						<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
							<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
						</svg>
					</div>
					<h3 class="card-title">用户登录</h3>
					<p class="card-description">体验现代化的登录界面，支持响应式设计和深色模式</p>
					<span class="card-link">立即体验 →</span>
				</div>

				<!-- 注册卡片 -->
				<div class="feature-card" @click="goToRegister">
					<div class="card-icon register-icon">
						<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
							<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
						</svg>
					</div>
					<h3 class="card-title">用户注册</h3>
					<p class="card-description">完整的表单验证，包括邮箱格式和密码强度检查</p>
					<span class="card-link">立即注册 →</span>
				</div>

				<!-- 弹窗测试卡片 -->
				<div class="feature-card" @click="goToTestConfirmDialog">
					<div class="card-icon dialog-icon">
						<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
						</svg>
					</div>
					<h3 class="card-title">弹窗组件</h3>
					<p class="card-description">自定义确认对话框，支持二按钮和三按钮模式</p>
					<span class="card-link">查看示例 →</span>
				</div>

				<!-- 状态管理卡片 -->
				<div class="feature-card" @click="goToTestStore">
					<div class="card-icon store-icon">
						<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
							<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H5v-4h7v4zm0-6H5V7h7v4zm7 6h-5v-4h5v4zm0-6h-5V7h5v4z"/>
						</svg>
					</div>
					<h3 class="card-title">状态管理</h3>
					<p class="card-description">基于 Pinia 的状态管理示例，展示数据流管理</p>
					<span class="card-link">探索更多 →</span>
				</div>
			</div>
		</section>

		<!-- 特性介绍区域 -->
		<section class="highlights-section">
			<h2 class="section-title">项目特性</h2>
			<div class="highlights-grid">
				<div class="highlight-item">
					<div class="highlight-icon">🎨</div>
					<h4>响应式设计</h4>
					<p>完美适配桌面端、平板和移动端</p>
				</div>
				<div class="highlight-item">
					<div class="highlight-icon">🌙</div>
					<h4>深色模式</h4>
					<p>支持日夜主题切换，自动保存偏好</p>
				</div>
				<div class="highlight-item">
					<div class="highlight-icon">⚡</div>
					<h4>快速构建</h4>
					<p>基于 Vite，开发体验极佳</p>
				</div>
				<div class="highlight-item">
					<div class="highlight-icon">📱</div>
					<h4>跨平台</h4>
					<p>支持 Electron 桌面应用和 Capacitor 移动应用</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
	router.push('/login');
};

const goToRegister = () => {
	router.push('/register');
};

const goToTestConfirmDialog = () => {
	router.push('/test-confirm-dialog');
};

const goToTestStore = () => {
	router.push('/test-store');
};
</script>

<style scoped>
.home-page {
	min-height: calc(100vh - 60px);
	background: linear-gradient(135deg, var(--el-bg-color-page) 0%, var(--el-fill-color-lighter) 100%);
}

/* 欢迎区域 */
.hero-section {
	padding: 60px 20px 40px;
	text-align: center;
	background: linear-gradient(135deg, var(--el-color-primary-light-9) 0%, var(--el-color-primary-light-8) 100%);
}

.hero-content {
	max-width: 800px;
	margin: 0 auto;
}

.hero-title {
	font-size: 48px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin-bottom: 16px;
	background: linear-gradient(135deg, var(--el-color-primary) 0%, var(--el-color-primary-light-3) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.hero-subtitle {
	font-size: 20px;
	color: var(--el-text-color-secondary);
	margin-bottom: 32px;
}

.tech-badges {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 12px;
}

.badge {
	padding: 8px 16px;
	background: var(--el-bg-color);
	border: 1px solid var(--el-border-color);
	border-radius: 20px;
	font-size: 14px;
	color: var(--el-text-color-regular);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	transition: all 0.3s ease;
}

.badge:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	border-color: var(--el-color-primary);
	color: var(--el-color-primary);
}

/* 功能卡片区域 */
.features-section {
	padding: 60px 20px;
	max-width: 1200px;
	margin: 0 auto;
}

.section-title {
	font-size: 32px;
	font-weight: bold;
	text-align: center;
	color: var(--el-text-color-primary);
	margin-bottom: 48px;
}

.cards-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 24px;
}

.feature-card {
	background: var(--el-bg-color);
	border-radius: 16px;
	padding: 32px 24px;
	cursor: pointer;
	transition: all 0.3s ease;
	border: 1px solid var(--el-border-color-lighter);
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.feature-card:hover {
	transform: translateY(-8px);
	box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
	border-color: var(--el-color-primary-light-5);
}

.card-icon {
	width: 64px;
	height: 64px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	transition: all 0.3s ease;
}

.login-icon {
	background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
	color: white;
}

.register-icon {
	background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
	color: white;
}

.dialog-icon {
	background: linear-gradient(135deg, #e6a23c 0%, #ebb563 100%);
	color: white;
}

.store-icon {
	background: linear-gradient(135deg, #f56c6c 0%, #f78989 100%);
	color: white;
}

.feature-card:hover .card-icon {
	transform: scale(1.1);
}

.card-title {
	font-size: 20px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin-bottom: 12px;
}

.card-description {
	font-size: 14px;
	color: var(--el-text-color-secondary);
	line-height: 1.6;
	margin-bottom: 16px;
	min-height: 45px;
}

.card-link {
	font-size: 14px;
	color: var(--el-color-primary);
	font-weight: 500;
	transition: all 0.3s ease;
}

.feature-card:hover .card-link {
	color: var(--el-color-primary-light-3);
}

/* 特性介绍区域 */
.highlights-section {
	padding: 60px 20px 80px;
	max-width: 1200px;
	margin: 0 auto;
}

.highlights-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 32px;
}

.highlight-item {
	text-align: center;
	padding: 24px;
	border-radius: 12px;
	transition: all 0.3s ease;
}

.highlight-item:hover {
	background: var(--el-fill-color-light);
	transform: translateY(-4px);
}

.highlight-icon {
	font-size: 48px;
	margin-bottom: 16px;
}

.highlight-item h4 {
	font-size: 18px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin-bottom: 8px;
}

.highlight-item p {
	font-size: 14px;
	color: var(--el-text-color-secondary);
	line-height: 1.6;
}

/* 移动端适配 */
@media (max-width: 768px) {
	.hero-section {
		padding: 40px 16px 32px;
	}

	.hero-title {
		font-size: 32px;
	}

	.hero-subtitle {
		font-size: 16px;
	}

	.tech-badges {
		gap: 8px;
	}

	.badge {
		padding: 6px 12px;
		font-size: 12px;
	}

	.features-section,
	.highlights-section {
		padding: 40px 16px;
	}

	.section-title {
		font-size: 24px;
		margin-bottom: 32px;
	}

	.cards-grid {
		grid-template-columns: 1fr;
		gap: 16px;
	}

	.feature-card {
		padding: 24px 20px;
	}

	.highlights-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.highlight-icon {
		font-size: 36px;
	}

	.highlight-item h4 {
		font-size: 16px;
	}

	.highlight-item p {
		font-size: 12px;
	}
}

/* 深色模式优化 */
html.dark .hero-section {
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

html.dark .badge {
	background: rgba(30, 30, 46, 0.8);
	border-color: rgba(255, 255, 255, 0.1);
}

html.dark .feature-card {
	background: rgba(30, 30, 46, 0.6);
	border-color: rgba(255, 255, 255, 0.08);
}

html.dark .feature-card:hover {
	border-color: var(--el-color-primary-light-5);
	background: rgba(30, 30, 46, 0.9);
}
</style>
