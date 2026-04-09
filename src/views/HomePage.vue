<template>
	<div class="home-container">
		<h1>首页</h1>
		<div class="button-group">
			<button @click="goToLogin" class="btn login-btn">去登录</button>
			<button @click="goToRegister" class="btn register-btn">去注册</button>
			<button @click="goToTestConfirmDialog" class="btn test-confirm-dialog-btn">去测试</button>
			<button @click="goToTestStore" class="btn test-store-btn">去测试</button>
		</div>
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
.home-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 20px;
}

.button-group {
	display: flex;
	gap: 20px;
	margin-top: 30px;
}

.btn {
	padding: 12px 24px;
	font-size: 16px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.login-btn {
	background-color: #409eff;
	color: white;
}

.login-btn:hover {
	background-color: #66b1ff;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.register-btn {
	background-color: #67c23a;
	color: white;
}

.register-btn:hover {
	background-color: #85ce61;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(103, 194, 58, 0.3);
}

.test-confirm-dialog-btn {
	background-color: #e6a23c;
	color: white;
}

.test-confirm-dialog-btn:hover {
	background-color: #ebb563;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(230, 162, 60, 0.3);
}

.test-store-btn {
	background-color: #f56c6c;
	color: white;
}
.test-store-btn:hover {
	background-color: #f78989;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}
</style>
