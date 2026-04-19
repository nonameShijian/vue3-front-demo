<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { ElContainer, ElHeader, ElMain, ElButton } from 'element-plus';
import { Sunny, Moon } from '@element-plus/icons-vue';

const router = useRouter();
const isDark = ref(false);

// 切换日夜模式
const toggleDarkMode = () => {
	isDark.value = !isDark.value;
	if (isDark.value) {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	}
};

// 初始化主题
onMounted(() => {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'dark') {
		isDark.value = true;
		document.documentElement.classList.add('dark');
	}
});

// 返回首页
const goHome = () => {
	router.push('/');
};

// 打开 GitHub
const openGitHub = () => {
	window.open('https://github.com/nonameShijian/vue3-front-demo', '_blank');
};
</script>

<template>
	<el-container class="app-container">
		<!-- 顶部导航栏 -->
		<el-header class="app-header">
			<div class="header-left">
				<span class="app-title" @click="goHome">Vue3 Front Demo</span>
			</div>
			<div class="header-right">
				<el-button link @click="openGitHub">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
				</el-button>
				<el-button :icon="isDark ? Sunny : Moon" circle @click="toggleDarkMode" />
			</div>
		</el-header>

		<!-- 主要内容区域 -->
		<el-main class="app-main">
			<RouterView />
		</el-main>
	</el-container>
</template>

<style scoped>
.app-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.app-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	background-color: var(--el-bg-color);
	border-bottom: 1px solid var(--el-border-color);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
	display: flex;
	align-items: center;
}

.app-title {
	font-size: 20px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	cursor: pointer;
	transition: color 0.3s;
}

.app-title:hover {
	color: var(--el-color-primary);
}

.header-right {
	display: flex;
	align-items: center;
	gap: 10px;
}

.app-main {
	padding: 0;
	background-color: var(--el-bg-color-page);
	flex: 1;
	overflow-y: auto;
}
</style>
