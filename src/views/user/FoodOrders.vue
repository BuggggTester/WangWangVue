<template>
  <el-card style="width: 70%">
    <el-page-header>
    </el-page-header>
    <div class="component" v-if="foodOrders.length>0" v-for="foodOrder in foodOrders" :key="foodOrders.id">
    <el-card style="width: 70%;">
      <template #header>
          <span style="font-size: 20px;">订单编号：{{ foodOrder.id }}</span>
      </template>
      <div style="display: flex">
        <div >
          <el-image :src="getServerUrl() + foodOrder.food.picture_path" height="100px" width="150px"></el-image>
        </div>
        <div style="margin-left: 5%">
          <el-row>
            <span style="font-size: larger; font-weight: bold; margin-top: 10%">{{ foodOrder.food.name }}</span>
          </el-row>
          <el-row>
            <span style="color: #6b778c; margin-top: 10%">总价：￥{{ foodOrder.quantity * foodOrder.food.price }}</span>
          </el-row>
        </div>
      </div>
      <template #footer>
        <el-collapse v-model="foodOrder.active">
        <el-collapse-item  name="1" title="点击显示更多信息">
          <el-row>
            <span>乘车人：{{ foodOrder.user.user_name }}</span>
          </el-row>
          <el-row>
            <span>出行车次：{{ foodOrder.user.user_name }}</span>
          </el-row>
        </el-collapse-item>
        </el-collapse>
      </template>
    </el-card>
    </div>
  </el-card>
</template>
<script setup>
import cookieUtil from '@/util/cookie';
import {onMounted, ref} from "vue";
import requestUtil, {getServerUrl} from "@/util/request";
const foodOrders = ref([]);
onMounted(async()=> {
  const res = await requestUtil.get('/totalorder/getAllFoodReservations',{
    "userId": cookieUtil.getCookie("userId")
  })
  foodOrders.value = res.data;
  foodOrders.value.forEach(item=> {
    item.active = false;
  })
  console.log(foodOrders.value);
})
</script>
<style scoped>
@import "@/assets/css/basic.css";
</style>