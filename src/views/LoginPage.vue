<template>
    <div>登录页</div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElForm, ElMessage } from "element-plus";

const formRef = ref<InstanceType<typeof ElForm>>();

const form = reactive({
    username: "",
    password: ""
});

// 校验规则
const rules = {
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" }
    ]
};

const login = () => {
    if (formRef.value) {
        formRef.value.validate((valid) => {
            if (valid) {
                console.log(form);
                // 登录逻辑
            } else {
                ElMessage.error("校验失败");
            }
        });
    }
};
</script>

<style></style>