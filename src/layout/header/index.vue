<template>
  <el-row style="background-color: #2d3a4b; height: 100px; display: flex; align-items: center;" >
    <el-col :span="5">
      <div style="color: white">
        <img src="../../assets/logo.png" alt="Logo" style="height: 40px; margin-right: 10px;">
        <span class="title" @click="goHome">汪汪旅途</span>
      </div>
    </el-col>
    <el-col :span="8" >
      <div>
        <el-input
            v-model="input"
            style="width: 480px;"
            placeholder="请输入查询内容"
            clearable
        />
      </div>
    </el-col>
    <el-col :span="3">
      <el-button type="primary" plain>搜索</el-button>
    </el-col>
    <el-col :span="2" :offset="2" style="color: white">
      欢迎，{{ user }}
    </el-col>
    <el-col :span="1">
      <span style="color: white; cursor: pointer" @click="dialogVisible = true">退出登录</span>
      <el-dialog
          v-model="dialogVisible"
          title="Tips"
          width="500"
      >
        <span>您确定要退出登录吗？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">返回</el-button>
            <el-button type="primary" @click="quit">
              退出
            </el-button>
          </div>
        </template>
      </el-dialog>
    </el-col>
    <el-col :span="2" :offset="1">
      <div>
<!--      <img :src="avatarUrl" alt="头像" style="height: 50px; margin-right: 10px;"/>-->
        <el-avatar :src="avatarUrl" />
      </div>
    </el-col>
  </el-row>
  <el-row>
  </el-row>
</template>

<script setup>
import {onMounted, ref} from 'vue'
const input = ref('')
import { useRouter } from 'vue-router'
import cookieUtil from "@/util/cookie"
import {ElMessage} from "element-plus";
import {getServerUrl} from "@/util/request";
const router = useRouter()
const user = cookieUtil.getCookie("userName")
const avatarUrl = getServerUrl()+cookieUtil.getCookie("avatar");
console.log(avatarUrl);
onMounted(()=> {
  if(user === ""){
    ElMessage({
      message: "请先登录！",
      type: "warning"
    });
    setTimeout(()=>{
      router.push('/login')
    },1000);
  }
})

let dialogVisible = ref(false)
const goHome = () =>{
  router.push('/main')
}
const quit = () =>{
  try{
    const rememberMe = cookieUtil.getCookie("rememberMe");
    if(!rememberMe) {
      //如果登录选择不记住密码，则清除cookie
      cookieUtil.deleteCookie("userName");
      cookieUtil.deleteCookie("userId");
      cookieUtil.deleteCookie("password");
      cookieUtil.deleteCookie("avatar");
    }
    dialogVisible = false;
    ElMessage({
      message: "退出成功！",
      type: "success"
    })
    setTimeout(()=>{
      router.push('/login')
    },500);
  }catch (e) {
    console.error(e);
    ElMessage({
      message: "退出失败",
      type: "warning"
    })
  }
}
</script>

<style lang="scss">
.title {
  font-size: 20px;
  cursor: pointer; /* 添加指针样式以提示可点击 */
}
</style>