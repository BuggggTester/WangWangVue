<template>
  <div v-if="orders.length > 0" v-for="order in orders" :key="order.order_id">
    <el-card class="trip-card">
      <template #header>
        <div class="card-header">
          <span><b>行程信息</b></span>
        </div>
      </template>
      <div class="trip-info">
        <div><b>车次：{{ order.trip.train_id }}</b></div>
        <div><b>起始站：{{ order.trip.from_place }}</b></div>
        <div><b>终点站：{{ order.trip.to_place }}</b></div>
        <div><b>发车时间：{{ order.trip.start_time }}</b></div>
        <div><b>座位：{{ order.row }} 排 {{ order.seat }} 座</b></div>
      </div>
      <template #footer>
        <el-button>查看订单</el-button>
        <el-button type="primary" plain @click="showDetailedOrder">修改订单</el-button>
        <el-button v-if="order.state !== 'canceled'" type="danger" plain @click="openCancelDialog">取消订单</el-button>
        <el-button v-else type="danger" plain disabled>订单已被取消</el-button>
        <el-dialog
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            title="取消订单"
            width="500"
        >
          <span>您确定要取消该订单吗？</span>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="closeCancelDialog">返回</el-button>
              <el-button type="primary" @click="cancelOrder(order)">
                残忍取消
              </el-button>
            </div>
          </template>
        </el-dialog>
      </template>
    </el-card>
  </div>
  <div v-else class="no-trip-card">
    <NoOrder/>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import requestUtil from "@/util/request";
import NoOrder from "@/views/NoOrder.vue";
const orders = ref([])

onMounted(async () => {
  const results = await requestUtil.get('/order/select/unfinished/1');//后续获取用户id，替换成${userId}
  orders.value = results.data;
  console.log(orders.value);
})
</script>
<style scoped>

</style>