<template>
  <div class="container">
  <el-result
      icon="warning"
      title="警告！"
      sub-title="您访问的页面无效"
  >
    <template #extra>
      <el-button type="primary" @click="backToMain">返回主页</el-button>
    </template>
  </el-result>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const backToMain = () => {
  router.push('/');
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>