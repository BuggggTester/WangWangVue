<template>
  <el-card class="trip-card">
    <template #header>
      <div class="card-header">
        <span>订单日期：2024年5月1日</span>
      </div>
    </template>

    <div class="trip-info">
      <el-row class="component">
        <el-col :span="6" class="trip-time">{{ order.trip.start_time }}</el-col>
        <el-col :span="6" class="trip-no">
          <div class="underline-container">
            <span class="underline-text">{{ order.trip.train_id }}</span>
          </div>
        </el-col>
        <el-col :span="6" class="trip-time">{{ order.trip.end_time }}</el-col>
        <el-col :span="6" class="trip-price">￥{{ order.payment }}</el-col>
      </el-row>
      <el-row class="component">
        <el-col :span="6" class="trip-place">{{ order.from_place }}</el-col>
<!--        <el-col :span="6" class="time">10时30分</el-col>-->
        <el-col :span="6" :offset="6" class="trip-place">{{ order.to_place }}</el-col>
      </el-row>
    </div>
    <template #footer>
      <el-button type="primary" plain>查看订单</el-button>
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
    </template>
  </el-card>
</template>
<script>
import requestUtil from "@/util/request";
import { ElMessage } from "element-plus";
import cookieUtil from "@/util/cookie";
export default {
  props: {
    order: Object
  },
  setup(props) {
    const cancelOrder = async (order) => {
      try {
        let orderId = order.order_id;
        let userId = cookieUtil.getCookie("userId");
        console.log(order);
        await requestUtil.get(`order/delete/${orderId}/${userId}`);
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