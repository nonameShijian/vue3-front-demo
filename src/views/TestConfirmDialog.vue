<template>
	<!-- 1. 两个按钮（默认） -->
	<ConfirmDialog v-model="dialogVisible1" title="提示" content="确定要删除吗？" @confirm="handleDelete" />

	<!-- 2. 三个按钮 -->
	<ConfirmDialog
		v-model="dialogVisible2"
		title="选择操作"
		content="请选择您要执行的操作"
		:show-neutral-button="true"
		neutral-button-text="稍后处理"
		neutral-button-type="warning"
		@confirm="handleConfirm"
		@cancel="handleCancel"
		@neutral="handleNeutral"
	/>

	<!-- 3. 自定义按钮配置 -->
	<ConfirmDialog
		v-model="dialogVisible3"
		title="重要提示"
		content="此操作不可恢复，请谨慎操作"
		cancel-button-text="我再想想"
		cancel-button-type="info"
		neutral-button-text="查看详情"
		neutral-button-type="warning"
		confirm-button-text="立即执行"
		confirm-button-type="danger"
		:confirm-loading="loading"
		@confirm="handleDangerousAction"
		@neutral="viewDetails"
	/>

	<!-- 4. 只使用一个按钮 -->
	<ConfirmDialog
		v-model="dialogVisible4"
		title="通知"
		content="操作成功"
		:show-cancel-button="false"
		confirm-button-text="知道了"
		@confirm="dialogVisible4 = false"
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const dialogVisible1 = ref(true);
const dialogVisible2 = ref(true);
const dialogVisible3 = ref(true);
const dialogVisible4 = ref(true);
const loading = ref(false);

const handleDelete = () => {
	console.log('执行删除');
	dialogVisible1.value = false;
};

const handleConfirm = () => {
	console.log('确认操作');
	dialogVisible2.value = false;
};

const handleCancel = () => {
	console.log('取消操作');
};

const handleNeutral = () => {
	console.log('中立操作');
	dialogVisible2.value = false;
};

const handleDangerousAction = async () => {
	loading.value = true;
	// 模拟异步操作
	await new Promise((resolve) => setTimeout(resolve, 2000));
	loading.value = false;
	dialogVisible3.value = false;
};

const viewDetails = () => {
	console.log('查看详情');
};
</script>
