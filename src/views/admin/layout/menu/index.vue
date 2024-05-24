<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo full-height"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      router="true"
  >
    <el-sub-menu index="/main">
      <template #title>
        <el-icon>
          <House/>
        </el-icon>
        <span>主页管理</span>
      </template>
      <el-menu-item index="/admin/main/trip">
        <span>旅游图片上传</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/select">
      <el-icon>
        <User/>
      </el-icon>
      <span>用户订单</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>车次/订单管理</span>
      </template>
        <el-menu-item index="/manage/trips">创建车次</el-menu-item>
        <el-menu-item index="/manage/orders">创建订单</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon>
        <setting/>
      </el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.full-height {
  height: 100%;
}
</style>
