<template>
<!--  orders-->
  <!-- <div v-if="orders.length > 0 " v-for="order in orders" :key="order.order_id">
    <div style="display: flex">
      <OrderCard :order="order"/>
      <OrderCard :order="order" style="margin-left: 5%"/>
    </div>

  </div> -->

  <div v-if="orders.length > 0">
  <!-- 渲染第一列 -->
  <div v-for="(order, index) in orders.slice(0, Math.ceil(orders.length / 2))" :key="order.order_id" style="display: flex">
    <OrderCard :order="order"/>
    <OrderCard :order="orders[index + Math.ceil(orders.length / 2)]" v-if="index + Math.ceil(orders.length / 2) < orders.length" style="margin-left: 5%"/>
  </div>

  <!-- 渲染第二列 -->
  <div v-if="orders.length > Math.ceil(orders.length / 2)" v-for="(order, index) in orders.slice(Math.ceil(orders.length / 2))" :key="order.order_id" style="display: flex">
    <OrderCard :order="order"/>
    <OrderCard :order="orders[index + Math.ceil(orders.length / 2)]" v-if="index + Math.ceil(orders.length / 2) < orders.length" style="margin-left: 5%"/>
  </div>
</div>

  <div v-else class="no-trip-card">
    <NoOrder/>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import requestUtil from "@/util/request";
import { ElMessage } from 'element-plus'
import cookieUtil from "@/util/cookie"
import NoOrder from "@/views/NoOrder.vue"
import OrderCard from "@/views/OrderCard.vue"
import {stampToTime} from "@/util/time";
const orders = ref([]); // 所有订单
const userId = cookieUtil.getCookie("userId");


onMounted(async () => {
  const results = await requestUtil.get(`/order/select/history/${userId}`);
  orders.value = results.data;
  console.log(results);
  console.log(orders);
  console.log(orders.value.length);
  orders.value.forEach(order => {
    order.dialogVisible3 = false;
    order.trip.start_time = stampToTime(order.trip.start_time);
    order.trip.end_time = stampToTime(order.trip.end_time);
  });
})
onMounted(()=> {
  // ignore ResizeObserver loop limit  exceeded
// this is ok in several scenarios according to
    const e = window.onerror
    window.onerror = function(err) {
      if (err === 'ResizeObserver loop limit exceeded') {
        console.warn('Ignored: ResizeObserver loop limit exceeded')
        return false
      } else {
        return e(...arguments)
      }
    }
})
</script>
<style>
/* 样式可以根据需要进行调整 */
@import "@/assets/css/basic.css";

</style>