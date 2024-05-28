<template>
  <div class="login-page">
<!--    <div class="background-image"></div>-->
<!--    <div class="login-container">-->
<!--      <span class="login">登录</span>-->
<!--    <div class="component">-->
<!--      <el-input v-model="account" :rules="loginRules" placeholder="请输入账号" style="width: 70%; height: 40px;" :prefix-icon="User" clearable="true"></el-input>-->
<!--    </div>-->
<!--    <div class="component">-->
<!--        <el-input v-model="password" :rules="loginRules" placeholder="请输入密码" style="width: 70%; height: 40px" :prefix-icon="User" type="password" show-password="true"></el-input>-->
<!--      </div>-->
<!--      <el-row>-->
<!--        <el-col :offset="4">-->
<!--        <el-button type="primary"  class="login-container-button"  @click="login">登录</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="2" :offset="4">-->
<!--        <el-checkbox v-model="remember" label="记住账号" size="large" />-->
<!--        </el-col>-->
<!--        <el-col :span="8" :offset="5">-->
<!--        <span style="font-size: 13px">没有账号？点此<span style="color:#25a4bb; cursor: pointer " @click="router.push('/register')">注册</span></span>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </div>-->
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <el-form-item prop="username">
        <h1 class="title">登录</h1>
        <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="账号"
        >
          <template #prefix><svg-icon icon="user" /></template>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon="password" /></template>
        </el-input>
      </el-form-item>
      <el-form-item>
      <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
        <span class="toLogin" >忘记密码？</span>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
            size="large"
            type="primary"
            style="width:47%;"
            @click.prevent="handleLogin"
        >
          <span>登 录</span>
        </el-button>
        <el-button
            size="large"
            type="default"
            style="width:47%;"
            @click.prevent="handleRegister"
        >
          <span>注 册</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { User } from '@element-plus/icons-vue'

import {onMounted, ref} from "vue";
import router from "@/router";
import requestUtil from "@/util/request"
import {ElMessage} from "element-plus";
import cookieUtil from "@/util/cookie"

const loginRef = ref(null);
const loginForm =ref({
  username: "",
  password: "",
  rememberMe: false
})
const loginRules = ref({
  account: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],

})
const handleLogin = ()=>{
  loginRef.value.validate(async(valid)=> {
    if(valid) {
      const res = await requestUtil.post('/user/login',{
        "userName": loginForm.value.username,
        "password": loginForm.value.password
      });
      console.log(res);
      if(loginForm.value.rememberMe) {
        cookieUtil.setCookie("userName", loginForm.value.username, 3);
        cookieUtil.setCookie("userId", res.data.userId, 3);
        cookieUtil.setCookie("password", res.data.password,3);
        cookieUtil.setCookie("avatar", res.data.avatar,3);
        //TODO: 后续添加其他cookie
      }else {
        cookieUtil.setCookie("userName", loginForm.value.username, 1);
        cookieUtil.setCookie("userId", res.data.userId, 1);
        cookieUtil.setCookie("password", res.data.password,1);
        cookieUtil.setCookie("avatar", res.data.avatar,1);
      }
      if(res.data.msg === 'login success'){
        ElMessage({
          message: "登陆成功！",
          type: "success"
        })
        await router.push('/main');
      }
    }
  })
}
const handleRegister = () => {
  router.push('/register');
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
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;



    input {
      display: inline-block;
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }

}
.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login/login.png");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
  font-size: larger;
  font-weight: bold;
}
.toLogin {
  color: #25a4bb;
  cursor: pointer;
  margin-left: 60%;
}
</style>