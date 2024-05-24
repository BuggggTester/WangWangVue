<template>
<!--  orders-->
  <div v-if="orders!= null" v-for="order in orders" :key="order.order_id">
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
      <div><b>座位：{{ order.row }}排 {{ order.seat }} 座</b></div>
    </div>
    <template #footer>
      <el-button>查看订单</el-button>
      <el-button type="primary" plain @click="openModifyDialog(order)">修改订单</el-button>
      <el-button v-if="order.state !== 'canceled'" type="danger" plain @click="openCancelDialog(order)">取消订单</el-button>
      <el-button v-else type="danger" plain disabled>订单已被取消</el-button>
      <el-dialog
          v-model="order.dialogVisible3"
          :visible.sync="order.dialogVisible3"
          title="取消订单"
          width="500"
          :order="order"
      >
      <span>您确定要取消该订单吗？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="closeCancelDialog(order)">返回</el-button>
          <el-button  @click="cancelOrder(order)">
            残忍取消~
          </el-button>
        </div>
      </template>
      </el-dialog>
      <el-dialog
          v-model="order.dialogVisible2"
          :visible.sync="order.dialogVisible2"
          title="修改订单"
          width="1000"
          :order="order"
      >
        <span>修改</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="closeModifyDialog(order)">返回</el-button>
            <el-button @click="modifyOrder(order)">
              提交修改
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
<!--  <el-pagination-->
<!--      v-if="totalPages > 1"-->
<!--      @current-change="handleCurrentChange"-->
<!--      :current-page="currentPage"-->
<!--      :page-sizes="[5, 10, 20, 50]"-->
<!--      :page-size="pageSize"-->
<!--      :total="totalOrders"-->
<!--      layout="prev, pager, next, jumper, sizes, total"-->
<!--  />-->
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import requestUtil from "@/util/request";
import { ElMessage } from 'element-plus'
const orders = ref([]); // 所有订单
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页订单数量

// 计算总页数
const totalPages = ref(1);
const totalOrders = ref(0);
// 计算当前页要显示的订单数据
const pagedOrders = ref([]);
const cancelOrder = async (order) => {
  try{
    let tripId = order.trip.trip_id;
    let userId = 1;
    console.log(order)
    console.log(tripId)
    await requestUtil.get(`order/delete/${tripId}/1`)
    console.log('删除成功！')
    ElMessage({
      message: '订单已取消！',
      type: 'success',
    })
    setTimeout(() => {
      location.reload();
    }, 500);
  }catch (e) {
    console.log(e)
    ElMessage.error('订单取消失败'+e)
  }
}
const openModifyDialog = (order) => {
  order.dialogVisible2 = true;
}
const closeModifyDialog = (order) => {
  order.dialogVisible2 =false;
  console.log(order.dialogVisible2)
}
const closeCancelDialog = (order) => {
  order.dialogVisible3 = false;
  console.log(order.dialogVisible3)
}
const openCancelDialog = (order) => {
  order.dialogVisible3 = true;
}
const modifyOrder = (order) => {

}
onMounted(async () => {
  const results = await requestUtil.get('/order/select/history/1');
  orders.value = results.data;
  orders.value.forEach(order => {
    order.dialogVisible3 = false;
  });
  // totalOrders.value = orders.value.length;
  // totalPages.value = Math.ceil(totalOrders.value / pageSize.value);
  // updatePagedOrders();
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
</style>