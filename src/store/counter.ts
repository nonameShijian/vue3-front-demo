import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useCounterStore = defineStore('counter', () => {
	const count = ref(0);
	const doubleCount = computed(() => count.value * 2);
	function increment() {
		count.value++;
	}

	return { count, doubleCount, increment };
});

/**
 * Pinia Store 用法说明：
 *
 * 1. 在组件中使用：
 *    <script setup lang="ts">
 *    import { useCounterStore } from '@/store/counter';
 *
 *    const counterStore = useCounterStore();
 *
 *    // 访问状态
 *    console.log(counterStore.count);
 *    console.log(counterStore.doubleCount);
 *
 *    // 修改状态
 *    counterStore.increment();
 *    </script>
 *
 * 2. 在模板中直接使用：
 *    <template>
 *      <div>{{ counterStore.count }}</div>
 *      <button @click="counterStore.increment">增加</button>
 *    </template>
 *
 * 3. 解构使用（保持响应性需要使用 storeToRefs）：
 *    <script setup lang="ts">
 *    import { storeToRefs } from 'pinia';
 *    import { useCounterStore } from '@/store/counter';
 *
 *    const counterStore = useCounterStore();
 *    const { count, doubleCount } = storeToRefs(counterStore);
 *    const { increment } = counterStore;
 *    </script>
 *
 * 4. 异步操作：
 *    export const useUserStore = defineStore('user', () => {
 *      const userInfo = ref(null);
 *
 *      async function fetchUserInfo() {
 *        const res = await request.get('/user/info');
 *        userInfo.value = res.data.obj;
 *      }
 *
 *      return { userInfo, fetchUserInfo };
 *    });
 */
