<template>
  <div class="login-page">
    <div class="background-image"></div>
    <div class="login-container">
      <span class="login">管理员登录</span>
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
    alert("请输入昵称！");
    return false;
  }
  if(password.value.length <= 1){
    alert("请输入密码！");
    return false;
  }
  try {
    user = await requestUtil.get('/user/select/admin', {
      "userName": account.value
    })
    console.log(user.data.password);
    cookieUtil.setCookie("adminName", user.data.user_name, 3); // 3天过期
  }catch (e) {
    console.error(e);
  }
  let pwd = user.data.password;
  console.log(pwd);
  if(pwd === password.value){
    await router.push('/admin/main');
    ElMessage({
      message: "登录成功！",
      type: "success"
    })
  }
  else{
    ElMessage({
      message: "登录失败！",
      type: "warning"
    })
  }
}

onMounted(async ()=>{
  const res = cookieUtil.getCookie("adminName")
  console.log(res)
  if(res !== ""){
    router.push('/admin/main').then(alert("自动登录成功！"))
  }
})
</script>
<style scoped>
@import "@/assets/css/card-image.css";
@import "@/assets/css/adminLogin.css";
</style>