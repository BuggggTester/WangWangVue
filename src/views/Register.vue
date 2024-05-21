<template>
  <div class="register-page">
    <div class="background-image"></div>
    <div class="register-container">
      <span class="register">注册</span>
      <div class="component">
        <span class="demonstration">请输入昵称</span>
        <el-input v-model="userName" placeholder="请输入昵称" style="width: 50%; height: 40px;padding-left: 5%" :prefix-icon="User" clearable="true"></el-input>

      </div>
      <div class="component">
        <span class="demonstration">请输入密码</span>
        <el-input v-model="password"
                  placeholder="6-20位，需包含数字、特殊字符、字母中至少两种"
                  style="width: 50%; height: 40px; padding-left: 5%"
                  :prefix-icon="User"
                  type="password"
                  show-password="true"/>
      </div>
      <div class="component">
        <span class="demonstration">请重新输入</span>
        <el-input v-model="confirm"
                  placeholder="请再次输入密码"
                  style="width: 50%; height: 40px; padding-left: 5%"
                  :prefix-icon="User"
                  type="password"
                  show-password="true"/>
      </div>
      <div class="component" style="display: flex; align-items: center; margin-left: 20%">
        <span class="demonstration">请输入验证码</span>
        <el-input v-model="code"
                  placeholder="请输入验证码"
                  style="width: 30%; height: 40px; padding-left: 5%"
                  :prefix-icon="User"
                  type="password"
                  show-password="true"/>
        <div class="login-code" @click="refreshCode" style="margin-left: 10px;">
          <!--验证码组件-->
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </div>
      <div class="component" style="display: flex; justify-content: center;">
        <el-button type="primary"  class="register-container-button"  @click="register">注册</el-button>
        <el-button type="primary"  class="register-container-button"  @click="router.push('/login')">返回登录页面</el-button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { User } from '@element-plus/icons-vue'
import SIdentify from "@/views/sidentify.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import * as requestUtil from "@/util/request";
const userName = ref('');
const password = ref('')
const confirm = ref('')
const verify = ref('')
const identifyCodes = '1234567890';
const identifyCode = ref('');
const code = ref('');
const tableData = ref([]);

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const refreshCode = () => {
  identifyCode.value = '';
  makeCode(identifyCodes, 4);
};

const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += identifyCodes[randomNum(0, identifyCodes.length)];
  }
  console.log("验证码", identifyCode.value);
};

const checkCaptcha = () => {
  if (code.value === "") {
    alert("请输入验证码");
    return false;
  }
  if (identifyCode.value !== code.value) {
    code.value = '';
    refreshCode();
    alert("请输入正确的验证码");
    return false;
  }
  console.log("验证码正确");
  return true;
};

onMounted(() => {
  identifyCode.value = '';
  makeCode(identifyCodes, 4);
});
const register = async() => {
  if(userName.value.length <= 1){
    alert("请输入昵称");
    return false;
  }
  if(password.value.length <= 1){
    alert("请输入密码");
    return false;
  }
  if(password.value !== confirm.value){
    alert("两次输入不一致！")
    return false;
  }
  if(checkCaptcha() === false) {
    return false;
  }
  const param = {
    "userName": userName.value,
    "password": password.value,
    "age": "1"
  };
  try {
    await requestUtil.post('/user/create', param).then(res=>{alert("注册成功！"); router.push('/login')});
  }catch (e){
    console.error(e);
  }
  return true;
}
</script>

<style>
.register-page {
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

.register-container {
  position: relative;
  width: 40%;
  height: 40%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 设置登录框背景色及透明度 */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 设置登录框阴影效果 */
  z-index: 999;
  text-align: center;
  font-size: 30px;
  flex-direction: column;
}
.register {
  font-size: 25px;
}
.register-container-button {
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
  margin-bottom: 20px; /* 设置组件之间的垂直间距为20px */
  margin-top: 20px;
}
.demonstration {
  color: var(--el-text-color-secondary);
  font-size: small;
}
</style>