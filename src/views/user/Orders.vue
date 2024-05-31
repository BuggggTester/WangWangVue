<template>
<!--  orders-->
  <div v-if="orders!= null" v-for="order in orders" :key="order.order_id">
    <OrderCard :order="order"/>
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
import OrderCard from "@/views/OrderCard.vue"
const orders = ref([]); // 所有订单
const userId = cookieUtil.getCookie("userId");


onMounted(async () => {
  const results = await requestUtil.get(`/order/select/history/${userId}`);
  orders.value = results.data;
  console.log(results);
  console.log(orders);
  orders.value.forEach(order => {
    order.dialogVisible3 = false;
  });
})
onMounted(()=> {
  // ignore ResizeObserver loop limit exceeded
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