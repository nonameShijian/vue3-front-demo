<template>
	<div>count: {{ count }}</div>
	<div>doubleCount: {{ doubleCount }}</div>
	<button @click="increment">点击增加</button>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/store/counter';

const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>
