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
    alert("请输入昵称！");
    return false;
  }
  if(password.value.length <= 1){
    alert("请输入密码！");
    return false;
  }
  try {
    user = await requestUtil.get('/user/select', {
      "userName": account.value
    })
    console.log(user.data[0].user_name);
    cookieUtil.setCookie("userName", user.data[0].user_name, 3); // 3天过期
  }catch (e) {
    console.error(e);
  }

  let pwd = user.data[0].password;
  console.log(pwd);
  if(pwd === password.value){
    await router.push('/main');
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
  const res = cookieUtil.getCookie("userName")
  console.log(res)
  if(res !== ""){
    router.push('/main').then(alert("自动登录成功！"))
  }
})
</script>

<style>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/login/login.png'); /* 替换为您的背景图片路径 */
  background-size: cover;
  opacity: 1; /* 背景图片透明度 */
}

.login-container {
  position: relative;
  margin-left: 40%;
  width: 30%;
  height: 30%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 1); /* 设置登录框背景色及透明度 */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 设置登录框阴影效果 */
  z-index: 999;
  text-align: center;
  font-size: 30px;
  flex-direction: column;
}
.login {
  font-size: 25px;
}
.login-container-button {
  width: 70%;
  padding: 10px;
  background-color: #007bff; /* 按钮背景颜色 */
  color: #fff; /* 按钮文字颜色 */
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
}
.component {
  margin-bottom: 15px; /* 设置组件之间的垂直间距为20px */
  margin-top: 15px;
}

</style>