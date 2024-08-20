<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="isCollapse ? '65px' : '200px'" class="sidebar-container"><Menu/></el-aside>
      <el-container>
        <el-header><Header/></el-header>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Menu from '@/layout/menu'
import Header from '@/layout/header'
import Footer from '@/layout/footer'
import Tabs from '@/layout/tabs'
import {onMounted} from "vue";
import router from "@/router";
import cookieUtil from "@/util/cookie";
import {ElMessage} from "element-plus";

onMounted(()=> {
  console.log(cookieUtil.getCookie("ifLogin"));
  // console.log(cookieUtil.getCookie("ifLogin") === "false");
  if(cookieUtil.getCookie("ifLogin") === "false"){
    console.log(cookieUtil.getCookie("ifLogin"));
    ElMessage({
      message: "请先登录！",
      type: "warning"
    });
    router.push('/login');
  }
})

</script>

<style scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  background-color: #2d3a4b;
  height: 100%;
}

.el-container{
  height:100%
}

.el-header{
  padding-left: 0px;
  padding-right: 0px;
  height: 60px;
}
.el-main {
  position: relative;
  padding-top: 30px;
  padding-bottom: 0px;
}

:deep(ul.el-menu){
  border-right-width: 0px
}

</style>
