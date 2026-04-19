<template>
	<div class="code-block-wrapper">
		<div class="code-header">
			<span class="code-filename">{{ filename }}</span>
			<el-tag v-if="language" size="small" :type="tagType">{{ language }}</el-tag>
		</div>
		<pre class="code-block" v-html="highlightedCode"></pre>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TagProps } from 'element-plus';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface Props {
	code: string;
	filename?: string;
	language?: string;
}

const props = withDefaults(defineProps<Props>(), {
	filename: 'code',
	language: 'typescript'
});

// 获取标签类型
const tagType = computed<TagProps['type']>(() => {
	const typeMap: Record<string, TagProps['type']> = {
		typescript: 'info',
		javascript: 'warning',
		vue: 'success',
		html: 'success',
		css: 'danger'
	};
	return typeMap[props.language] || 'info';
});

// 高亮代码
const highlightedCode = computed(() => {
	try {
		const result = hljs.highlight(props.code, { language: props.language });
		return result.value;
	} catch (error) {
		console.error('代码高亮失败:', error);
		return props.code;
	}
});
</script>

<style scoped>
.code-block-wrapper {
	background: var(--el-bg-color);
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
	border: 1px solid var(--el-border-color-lighter);
	margin-bottom: 32px;
}

.code-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 20px;
	background: var(--el-fill-color-light);
	border-bottom: 1px solid var(--el-border-color-lighter);
}

.code-filename {
	font-size: 14px;
	color: var(--el-text-color-regular);
	font-weight: 500;
	font-family: 'Courier New', monospace;
}

.code-block {
	margin: 0;
	padding: 24px;
	background: #0d1117;
	color: #c9d1d9;
	font-size: 14px;
	line-height: 1.6;
	overflow-x: auto;
	font-family: 'Courier New', Consolas, Monaco, monospace;
}

.code-block :deep(code) {
	display: block;
	background: transparent;
	padding: 0;
}

/* 高亮样式覆盖 */
.code-block :deep(.hljs) {
	background: transparent;
	color: #c9d1d9;
}

.code-block :deep(.hljs-keyword) {
	color: #ff7b72;
}

.code-block :deep(.hljs-string) {
	color: #a5d6ff;
}

.code-block :deep(.hljs-comment) {
	color: #8b949e;
	font-style: italic;
}

.code-block :deep(.hljs-function) {
	color: #d2a8ff;
}

.code-block :deep(.hljs-number) {
	color: #79c0ff;
}

.code-block :deep(.hljs-title) {
	color: #d2a8ff;
}

.code-block :deep(.hljs-params) {
	color: #ffa657;
}

.code-block :deep(.hljs-tag) {
	color: #7ee787;
}

.code-block :deep(.hljs-attr) {
	color: #79c0ff;
}

/* 移动端适配 */
@media (max-width: 768px) {
	.code-block {
		font-size: 12px;
		padding: 16px;
	}

	.code-header {
		padding: 12px 16px;
	}

	.code-filename {
		font-size: 12px;
	}
}

/* 深色模式优化 */
html.dark .code-block-wrapper {
	background: rgba(30, 30, 46, 0.6);
	border-color: rgba(255, 255, 255, 0.08);
}
</style>
