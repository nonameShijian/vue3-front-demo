<template>
	<div>注册页</div>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="form.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="form.password" type="password"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="confirmPassword">
			<el-input v-model="form.confirmPassword" type="password"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="register">注册</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm, ElMessage, FormItemRule } from 'element-plus';
import { Arrayable } from 'element-plus/es/utils/typescript.mjs';

const formRef = ref<InstanceType<typeof ElForm>>();

const form = reactive({
	username: '',
	password: '',
	confirmPassword: '',
	email: '',
});

// 校验规则
const rules: Partial<Record<string, Arrayable<FormItemRule>>> = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
	],
	confirmPassword: [
		{ required: true, message: '请再次输入密码', trigger: 'blur' },
		{
			validator: (_rule, value, callback) => {
				if (value !== form.password) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			},
			trigger: 'blur',
		},
	],
	email: [
		{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
		{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
	],
};

const register = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				console.log(form);
				// 注册逻辑
			} else {
				ElMessage.error('校验失败');
			}
		});
	}
};
</script>

<style></style>
