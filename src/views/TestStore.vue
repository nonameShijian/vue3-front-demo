<template>
	<div class="test-store-page">
		<!-- 页面标题 -->
		<section class="page-header">
			<h1 class="page-title">Pinia 状态管理示例</h1>
			<p class="page-subtitle">展示如何使用 Pinia 进行全局状态管理</p>
		</section>

		<!-- 交互式演示区域 -->
		<section class="demo-section">
			<div class="demo-card">
				<div class="card-header">
					<h2 class="card-title">🔢 计数器演示</h2>
					<span class="badge">实时响应</span>
				</div>

				<div class="demo-content">
					<!-- 状态显示 -->
					<div class="state-display">
						<div class="state-item">
							<span class="state-label">count</span>
							<span class="state-value count-value">{{ count }}</span>
						</div>
						<div class="state-divider">×</div>
						<div class="state-item">
							<span class="state-label">doubleCount</span>
							<span class="state-value double-value">{{ doubleCount }}</span>
						</div>
					</div>

					<!-- 操作按钮 -->
					<div class="action-buttons">
						<el-button type="primary" size="large" @click="increment">
							<el-icon><Plus /></el-icon>
							增加 (+1)
						</el-button>
						<el-button type="success" size="large" @click="incrementBy(5)">
							<el-icon><CirclePlus /></el-icon>
							增加 (+5)
						</el-button>
						<el-button type="warning" size="large" @click="reset">
							<el-icon><RefreshLeft /></el-icon>
							重置
						</el-button>
					</div>
				</div>
			</div>
		</section>

		<!-- 代码展示区域 -->
		<section class="code-section">
			<h2 class="section-title">📝 Store 定义代码</h2>
			<CodeBlock :code="storeCode" filename="src/store/counter.ts" language="typescript" />

			<h2 class="section-title">💻 组件使用代码</h2>
			<CodeBlock :code="componentCode" filename="src/views/TestStore.vue" language="html" />
		</section>

		<!-- 特性说明 -->
		<section class="features-section">
			<h2 class="section-title">✨ Pinia 特性</h2>
			<div class="features-grid">
				<div class="feature-item">
					<div class="feature-icon">🎯</div>
					<h4>类型安全</h4>
					<p>完整的 TypeScript 支持，提供智能提示和类型检查</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">⚡</div>
					<h4>简洁 API</h4>
					<p>基于 Composition API，代码更直观易读</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">🔄</div>
					<h4>响应式更新</h4>
					<p>自动追踪依赖，状态变化时视图自动更新</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">🌍</div>
					<h4>全局共享</h4>
					<p>在任意组件中访问和修改同一份状态</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/store/counter';
import { Plus, CirclePlus, RefreshLeft } from '@element-plus/icons-vue';
import CodeBlock from '@/components/CodeBlock.vue';

const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);
const { increment, reset } = counterStore;

// 自定义增加方法
const incrementBy = (value: number) => {
	for (let i = 0; i < value; i++) {
		increment();
	}
};

// Store 定义代码
const storeCode = computed(() => `import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  // 状态
  const count = ref(0);
  
  // 计算属性
  const doubleCount = computed(() => count.value * 2);
  
  // 方法
  function increment() {
    count.value++;
  }

  // 重置方法
  function reset() {
    count.value = 0;
  }

  return { count, doubleCount, increment, reset };
});`);

// 组件使用代码
const componentCode = computed(() => {
	return [
		'<script setup lang="ts">',
		"import { storeToRefs } from 'pinia';",
		"import { useCounterStore } from '@/store/counter';",
		'',
		'const counterStore = useCounterStore();',
		'',
		'// 解构状态（保持响应性）',
		'const { count, doubleCount } = storeToRefs(counterStore);',
		'',
		'// 解构方法',
		'const { increment, reset } = counterStore;',
		'</scr' + 'ipt>',
		'',
		'<template>',
		'  <div>count: {{ count }}</div>',
		'  <div>double: {{ doubleCount }}</div>',
		'  <button @click="increment">+1</button>',
		'  <button @click="reset">重置</button>',
		'</template>'
	].join('\n');
});
</script>

<style scoped>
.test-store-page {
	min-height: calc(100vh - 60px);
	background: linear-gradient(135deg, var(--el-bg-color-page) 0%, var(--el-fill-color-lighter) 100%);
	padding-bottom: 60px;
}

/* 页面标题 */
.page-header {
	padding: 40px 20px 32px;
	text-align: center;
	background: linear-gradient(135deg, var(--el-color-primary-light-9) 0%, var(--el-color-primary-light-8) 100%);
}

.page-title {
	font-size: 36px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin-bottom: 12px;
}

.page-subtitle {
	font-size: 16px;
	color: var(--el-text-color-secondary);
}

/* 演示区域 */
.demo-section {
	padding: 40px 20px;
	max-width: 800px;
	margin: 0 auto;
}

.demo-card {
	background: var(--el-bg-color);
	border-radius: 16px;
	padding: 32px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	border: 1px solid var(--el-border-color-lighter);
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px;
}

.card-title {
	font-size: 24px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin: 0;
}

.badge {
	padding: 6px 12px;
	background: var(--el-color-success-light-9);
	color: var(--el-color-success);
	border-radius: 12px;
	font-size: 12px;
	font-weight: 500;
}

.demo-content {
	display: flex;
	flex-direction: column;
	gap: 32px;
}

/* 状态显示 */
.state-display {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 24px;
	padding: 32px;
	background: var(--el-fill-color-light);
	border-radius: 12px;
}

.state-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
}

.state-label {
	font-size: 14px;
	color: var(--el-text-color-secondary);
	font-weight: 500;
}

.state-value {
	font-size: 48px;
	font-weight: bold;
	font-family: 'Courier New', monospace;
	transition: all 0.3s ease;
}

.count-value {
	color: var(--el-color-primary);
}

.double-value {
	color: var(--el-color-success);
}

.state-divider {
	font-size: 32px;
	color: var(--el-text-color-placeholder);
	font-weight: bold;
}

/* 操作按钮 */
.action-buttons {
	display: flex;
	gap: 12px;
	justify-content: center;
	flex-wrap: wrap;
}

.action-buttons .el-button {
	min-width: 120px;
}

/* 代码展示区域 */
.code-section {
	padding: 40px 20px;
	max-width: 1000px;
	margin: 0 auto;
}

.section-title {
	font-size: 24px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin-bottom: 24px;
	text-align: center;
}

/* 特性说明 */
.features-section {
	padding: 40px 20px;
	max-width: 1000px;
	margin: 0 auto;
}

.features-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 24px;
}

.feature-item {
	text-align: center;
	padding: 24px;
	background: var(--el-bg-color);
	border-radius: 12px;
	border: 1px solid var(--el-border-color-lighter);
	transition: all 0.3s ease;
}

.feature-item:hover {
	transform: translateY(-4px);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
	border-color: var(--el-color-primary-light-5);
}

.feature-icon {
	font-size: 40px;
	margin-bottom: 16px;
}

.feature-item h4 {
	font-size: 18px;
	font-weight: bold;
	color: var(--el-text-color-primary);
	margin-bottom: 8px;
}

.feature-item p {
	font-size: 14px;
	color: var(--el-text-color-secondary);
	line-height: 1.6;
	margin: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
	.page-header {
		padding: 32px 16px 24px;
	}

	.page-title {
		font-size: 28px;
	}

	.page-subtitle {
		font-size: 14px;
	}

	.demo-section,
	.code-section,
	.features-section {
		padding: 32px 16px;
	}

	.demo-card {
		padding: 24px 20px;
	}

	.card-title {
		font-size: 20px;
	}

	.state-display {
		padding: 24px 16px;
		gap: 16px;
	}

	.state-value {
		font-size: 36px;
	}

	.state-divider {
		font-size: 24px;
	}

	.action-buttons {
		flex-direction: column;
	}

	.action-buttons .el-button {
		width: 100% !important;
		min-width: 100% !important;
		margin-left: 0 !important;
	}

	.section-title {
		font-size: 20px;
	}

	.code-block {
		font-size: 12px;
		padding: 16px;
	}

	.features-grid {
		grid-template-columns: 1fr;
		gap: 16px;
	}

	.feature-item {
		padding: 20px;
	}
}

/* 深色模式优化 */
html.dark .page-header {
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

html.dark .demo-card,
html.dark .feature-item {
	background: rgba(30, 30, 46, 0.6);
	border-color: rgba(255, 255, 255, 0.08);
}
</style>
