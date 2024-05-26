<template>
  <div class="login-page">
    <div class="background-image"></div>
    <div class="login-container">
      <span class="login">登录</span>
    <div class="component">
      <el-input v-model="account" placeholder="请输入账号" style="width: 70%; height: 40px;" :prefix-icon="User" clearable="true"></el-input>
    </div>
      <div class="component">
        <el-input v-model="password" placeholder="请输入密码" style="width: 70%; height: 40px" :prefix-icon="User" type="password" show-password="true"></el-input>
      </div>
      <el-row>
        <el-col :offset="4">
        <el-button type="primary"  class="login-container-button"  @click="login">登录</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="4">
        <el-checkbox v-model="remember" label="记住账号" size="large" />
        </el-col>
        <el-col :span="8" :offset="5">
        <span style="font-size: 13px">没有账号？点此<span style="color:#25a4bb; cursor: pointer " @click="router.push('/register')">注册</span></span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { User } from '@element-plus/icons-vue'

import {onMounted, ref} from "vue";
import router from "@/router";
import requestUtil from "@/util/request"
import {ElMessage} from "element-plus";
import cookieUtil from "@/util/cookie"
const account = ref('');
const password = ref('')
let user = ref([])
const remember = ref(false)
const login = async() => {
  console.log(remember.value)
  if(account.value.length<=1) {
    ElMessage({
      message: "请输入昵称！",
      type: "warning"
    })
    return false;
  }
  if(password.value.length <= 1){
    ElMessage({
      message: "请输入密码！",
      type: "warning"
    })
    return false;
  }
  try {
    user = await requestUtil.get('/user/select', {
      "userName": account.value
    })
    console.log(user.data[0].user_name);
  }catch (e) {
    console.error(e);
  }

  let pwd = user.data[0].password;
  console.log(user.data[0].user_name);
  console.log(pwd);
  if(pwd === password.value){
    await router.push('/main');
    cookieUtil.setCookie("userName", user.data[0].user_name, 1); // 1天过期
    ElMessage({
      message: "登录成功！",
      type: "success"
    })
  }
  else if(user.data[0].user_name == null) {
    ElMessage({
      message: "登陆失败：用户名不存在！",
      type: "warning"
    })
  }
  else if(pwd !== password.value){
    ElMessage({
      message: "登录失败：密码错误",
      type: "warning"
    })
  }
}

onMounted(async ()=>{
  const res = cookieUtil.getCookie("userName")
  console.log(res)
  if(res !== ""){
    router.push('/main').then(ElMessage({
      message: "已自动登录！",
      type: "success"
    }))
  }
})
</script>

<style>
@import "@/assets/css/login.css";
@import "@/assets/css/card-image.css";

</style>