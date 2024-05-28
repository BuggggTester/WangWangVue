<template>
  <div>
    <el-card class="userCard">
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
        </div>
      </template>
      <div class="card-content">
        <p class="card-term">用户名</p>
        <p class="card-term">昵称</p>
        <p class="card-term">用户类型</p>
      </div>
    </el-card>
    <el-card class="userCard">
      <template #header>
        <div class="card-header">
          <span>账号信息</span>
        </div>
      </template>
      <div class="card-content">
        <p class="card-term">用户ID</p>
        <p class="card-term">创建时间</p>
      </div>
    </el-card>
    <el-card class="userCard">
      <template #header>
        <div class="card-header">
          <span>账户安全</span>
        </div>
      </template>
      <div class="card-content">
        <p class="card-term">验证邮箱</p>
      </div>
    </el-card>
  </div>
</template>

<style>
.userCard {
  max-width: 90%;
  margin-bottom: 1.5%;
  margin-left: 5%;
}

.card-header {
  font-family: 微软雅黑;
  font-size: 25px;
  font-weight: bold;
}

.card-content {
  margin-left: 3%;
}

.card-term {
  font-family: 微软雅黑;
  font-size: 20px;
  font-weight: bold;
  margin-top: 1%;
  margin-bottom: 1.5%;
}
</style>
<script lang="ts">
</script>