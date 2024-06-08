<template>
  <div class="payment">
    <el-card class="pay-card">
      <template #header>
        <div class="card-header">
          <span>请确认订单并支付</span>
        </div>
      </template>
      <div class="payment-info">

      </div>
      <template #footer>
        <el-row class="confirm-button">
          <el-col :span="12">
            <el-button class="bottom-button">
              <div class="text-in-button">放弃支付，我再想想</div>
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" class="bottom-button">
              <div class="text-in-button">不再犹豫，确认支付</div>
            </el-button>
          </el-col>
        </el-row>
      </template>
    </el-card>
  </div>
</template>


<script setup>
</script>

<style scoped>
.pay-card {
  margin-left: 15%;
  width: 70%;
  margin-top: 3%;
}

.card-header {
  font-family: 微软雅黑;
  font-size: 35px;
  text-align: center;
  font-weight: bold;
}

.text-in-button {
  font-size: 20px;
  font-weight: bold;
  font-family: 微软雅黑;
}

.bottom-button {
  width: 70%;
  margin-left:15%;
  height: 45px;
}

.confirm-button {
  height: 100%;
}
</style>