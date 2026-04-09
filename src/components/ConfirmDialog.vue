<template>
	<el-dialog
		v-model="visible"
		:title="title"
		:width="width"
		:close-on-click-modal="closeOnClickModal"
		:close-on-press-escape="closeOnPressEscape"
		:show-close="showClose"
		@close="handleClose"
	>
		<div class="dialog-content">
			<p v-if="content" class="content-text">{{ content }}</p>
			<slot name="content" />
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button v-if="showCancelButton" :type="cancelButtonType" :loading="cancelLoading" @click="handleCancel">
					{{ cancelButtonText }}
				</el-button>
				<el-button v-if="showNeutralButton" :type="neutralButtonType" :loading="neutralLoading" @click="handleNeutral">
					{{ neutralButtonText }}
				</el-button>
				<el-button v-if="showConfirmButton" :type="confirmButtonType" :loading="confirmLoading" @click="handleConfirm">
					{{ confirmButtonText }}
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	/** 是否显示对话框 */
	modelValue: boolean;
	/** 标题 */
	title?: string;
	/** 内容 */
	content?: string;
	/** 对话框宽度 */
	width?: string;
	/** 是否可以通过点击 modal 关闭 */
	closeOnClickModal?: boolean;
	/** 是否可以通过按下 ESC 关闭 */
	closeOnPressEscape?: boolean;
	/** 是否显示关闭按钮 */
	showClose?: boolean;

	/** 是否显示取消按钮 */
	showCancelButton?: boolean;
	/** 取消按钮文字 */
	cancelButtonText?: string;
	/** 取消按钮类型 */
	cancelButtonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
	/** 取消按钮加载状态 */
	cancelLoading?: boolean;

	/** 是否显示中间按钮 */
	showNeutralButton?: boolean;
	/** 中间按钮文字 */
	neutralButtonText?: string;
	/** 中间按钮类型 */
	neutralButtonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
	/** 中间按钮加载状态 */
	neutralLoading?: boolean;

	/** 是否显示确认按钮 */
	showConfirmButton?: boolean;
	/** 确认按钮文字 */
	confirmButtonText?: string;
	/** 确认按钮类型 */
	confirmButtonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
	/** 确认按钮加载状态 */
	confirmLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	title: '提示',
	content: '',
	width: '400px',
	closeOnClickModal: false,
	closeOnPressEscape: true,
	showClose: true,

	showCancelButton: true,
	cancelButtonText: '取消',
	cancelButtonType: 'info',
	cancelLoading: false,

	showNeutralButton: false,
	neutralButtonText: '中立',
	neutralButtonType: 'info',
	neutralLoading: false,

	showConfirmButton: true,
	confirmButtonText: '确定',
	confirmButtonType: 'primary',
	confirmLoading: false,
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'neutral', 'close']);

const visible = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:modelValue', val),
});

/**
 * 确认按钮点击
 */
const handleConfirm = () => {
	emit('confirm');
};

/**
 * 取消按钮点击
 */
const handleCancel = () => {
	visible.value = false;
	emit('cancel');
};

/**
 * 中间按钮点击
 */
const handleNeutral = () => {
	emit('neutral');
};

/**
 * 对话框关闭
 */
const handleClose = () => {
	emit('close');
};
</script>

<style scoped>
.dialog-content {
	min-height: 60px;
	padding: 10px 0;
}

.content-text {
	margin: 0;
	line-height: 1.6;
	color: #606266;
	font-size: 14px;
}

.dialog-footer {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}

.dialog-footer .el-button {
	min-width: 80px;
}
</style>
