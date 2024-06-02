<template>
  <el-card class="trip-card">
    <template #header>
      <div class="card-header">
        <span>订单日期：2024年5月1日</span>
      </div>
    </template>

    <div class="trip-info">
      <!--      <div><b>车次：{{ order.trip.train_id }}</b></div>-->
      <!--      <div><b>起始站：{{ order.trip.from_place }}</b></div>-->
      <!--      <div><b>终点站：{{ order.trip.to_place }}</b></div>-->
      <!--      <div><b>发车时间：{{ order.trip.start_time }}</b></div>-->
      <!--      <div><b>座位：{{ order.row }}排 {{ order.seat }} 座</b></div>-->
      <el-row class="component">
        <el-col :span="6" class="trip-time">07:00</el-col>
        <el-col :span="6" class="trip-no">
          <div class="underline-container">
            <span class="underline-text">G87</span>
          </div>
        </el-col>
        <el-col :span="6" class="trip-time">12:00</el-col>
        <el-col :span="6" class="trip-price">￥622</el-col>
      </el-row>
      <el-row class="component">
        <el-col :span="6" class="trip-place">北京西</el-col>
        <el-col :span="6" class="time">10时30分</el-col>
        <el-col :span="6" class="trip-place">成都东</el-col>
      </el-row>
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
</template>
<script>
import requestUtil from "@/util/request";
import { ElMessage } from "element-plus";

export default {
  props: {
    order: Object
  },
  setup(props) {
    const cancelOrder = async (order) => {
      try {
        let tripId = order.trip.trip_id;
        let userId = 1;
        console.log(order);
        console.log(tripId);
        await requestUtil.get(`order/delete/${tripId}/${userId}`);
        console.log('删除成功！');
        ElMessage({
          message: '订单已取消！',
          type: 'success',
        });
        setTimeout(() => {
          location.reload();
        }, 500);
      } catch (e) {
        console.log(e);
        ElMessage.error('订单取消失败' + e);
      }
    };

    const openModifyDialog = (order) => {
      order.dialogVisible2 = true;
    };

    const closeModifyDialog = (order) => {
      order.dialogVisible2 = false;
      console.log(order.dialogVisible2);
    };

    const closeCancelDialog = (order) => {
      order.dialogVisible3 = false;
      console.log(order.dialogVisible3);
    };

    const openCancelDialog = (order) => {
      order.dialogVisible3 = true;
    };

    const modifyOrder = (order) => {
      // 在这里添加修改订单的逻辑
    };

    return {
      cancelOrder,
      openModifyDialog,
      closeModifyDialog,
      closeCancelDialog,
      openCancelDialog,
      modifyOrder
    };
  },

  methods: {
    // 这里可以添加其他需要的方法
  }
}
</script>
<style scoped>
@import "@/assets/css/card-order.css";
</style>