<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px" class="sidebar-container"><Menu/></el-aside>
      <el-container>
        <el-header><Header/></el-header>
        <el-main><router-view/></el-main>
        <el-footer><Footer/></el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Menu from '@/views/admin/layout/menu'
import Header from '@/views/admin/layout/header'
import Footer from '@/views/admin/layout/footer'
import Tabs from '@/views/admin/layout/tabs'
import {onMounted} from "vue";
import router from "@/router";


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
  height: 100px;
}
.el-main {
  position: relative;
  padding-top: 50px;
}
:deep(ul.el-menu){
  border-right-width: 0px
}

</style>
