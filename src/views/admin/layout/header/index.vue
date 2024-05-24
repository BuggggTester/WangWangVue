<template>
  <el-row style="background-color: #2d3a4b; height: 100px; display: flex; align-items: center;" >
    <el-col :span="5">
      <div style="color: white">
        <img src="../../../../assets/logo.png" alt="Logo" style="height: 40px; margin-right: 10px;">
        <span class="title" @click="goHome">汪汪旅途</span>
      </div>
    </el-col>

    <el-col :span="3" :offset="12" style="color: white">
      欢迎管理员，{{ user }}
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
      <img src="../../../../assets/images/head.png" alt="头像" style="height: 50px; margin-right: 10px;"/>
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
const router = useRouter()
const user = cookieUtil.getCookie("adminName")
let dialogVisible = ref(false)
const goHome = () =>{
  router.push('/admin/main')
}
const quit = () =>{
  try{
    cookieUtil.deleteCookie("adminName");
    dialogVisible = false;
    ElMessage({
      message: "退出成功！",
      type: "success"
    })
    setTimeout(()=>{
      router.push('/admin/login')
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