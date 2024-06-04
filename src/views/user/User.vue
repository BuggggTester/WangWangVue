<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-tabs v-model="activeName" class="demo-tabs" router="true" >
          <el-tab-pane label="未完成订单" name="first" index="1" @tab-click="showUnfinishedOrders">
<!--            <NoOrder/>-->
          </el-tab-pane>
          <el-tab-pane label="未出行订单" name="second" index="2" @tab-click="showNoDepartureOrders">
          </el-tab-pane>
          <el-tab-pane label="历史订单" name="third" index="3" @tab-click="showMyOrders">
          </el-tab-pane>
          <el-tab-pane label="酒店订单" name="fourth" index="4" @tab-click="showHotelOrders"/>
        </el-tabs>
      </el-header>
      <el-main><router-view/></el-main>
    </el-container>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import requestUtil from '@/util/request';
import { ElMessage } from 'element-plus';
import Orders from '@/views/user/Orders.vue';
import NoOrder from '@/views/NoOrder.vue';
const activeName = ref('first'); // 默认选中的选项卡名称
const router = useRouter();
const dialogVisible = ref(false);
const orders = ref([]);
const showHotelOrders = async() => {
  await router.push('/user/hotelOrders');
}
const showMyOrders = async () =>{
  await router.push('/user/orders')
}
// const showNoDepartureOrders = async () => {
//   try {
//     const results = await requestUtil.get('/order/select/notdeparture/1');//后续获取用户id，替换成${userId}
//     orders.value = results.data;
//     console.log(orders.value);
//   } catch (error) {
//     console.error('获取失败：', error);
//   }
// }
const showNoDepartureOrders = async () => {
  await router.push('/user/notdeparture')
}
const showDetailedOrder = async () => {
  // 实现显示详细订单的逻辑
};
const showUnfinishedOrders = async () => {
  await router.push('/user/unfinished')
}

watch(activeName, (newVal, oldVal) => {
  // 根据新选中的选项卡名称执行相应的操作
  switch (newVal) {
    case 'first':
      // 执行 tab1 相关操作
        showUnfinishedOrders();
      break;
    case 'second':
      showNoDepartureOrders();
      // 执行 tab2 相关操作
      break;
    case 'third':
      showMyOrders();
      break;
    case 'fourth':
      showHotelOrders();
      break;
    default:
      break;
  }
});
</script>
<style>

</style>
<!--.fixed_container {-->
<!--position: fixed;-->
<!--top: 12%;-->
<!--width: 80%;-->
<!--/* 或者根据需要设置宽度 */-->
<!--z-index: 999; /* 如果需要覆盖其他元素，可以设置一个较高的 z-index */-->
<!--}-->