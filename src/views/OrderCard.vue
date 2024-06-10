<template>
  <el-card class="trip-card">
    <template #header>
      <div class="card-header">
        <span>订单日期：{{ formToDate(order.order_time) }}</span>
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
        <el-col :span="6" :offset="6" class="trip-place">{{ order.to_place }}</el-col>
      </el-row>
    </div>
    <template #footer>
      <el-button type="primary" plain @click="orderDetailDialog = true">查看订单</el-button>
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

  <el-dialog 
    v-model="orderDetailDialog"
    title="查看订单"
    width="700"
    :order="order">
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
        <el-col :span="6" :offset="6" class="trip-place">{{ order.to_place }}</el-col>
        <el-col :span="6" class="ticket-level">
          <span style="align-items: center">{{ seatTypeText }}</span></el-col>
      </el-row>
    </div>
    <hr>
    <div class="component">
    <span style="font-size:20px;">乘车人信息：</span>
    </div>
    <el-card style="width: 100%">
    <div style="display: flex">
      <div style="width: 80%">
        <div class="component">
          <el-row>
            <el-col :span="4">
              <span style="font-size: larger; color: #12a72b">{{ order.passenger.name }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="component">
          <hr style="color: #6b778c">
        </div>
        <div class="component">
          <el-row>
            <span>手机号: {{ order.passenger.phone_number }}</span>
          </el-row>
        </div>
        <div class="component">
          <el-row>
            <span>身份证号: {{ maskedIdentity }}</span>
          </el-row>
        </div>
      </div>
    </div>
  </el-card>
  </el-dialog>
</template>
<script>
import requestUtil from "@/util/request";
import { ElMessage } from "element-plus";
import cookieUtil from "@/util/cookie";
import {computed, onMounted, ref} from 'vue';
import {formToDate} from "../util/time";

export default {
  props: {
    order: Object
  },
  setup(props) {
    const { order } = props;
    const cancelOrder = async () => {
      try {
        let orderId = order.order_id;
        let userId = cookieUtil.getCookie("userId");
        console.log(order);
        await requestUtil.get(`order/cancel/${orderId}/${userId}`);
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
    const seatTypeText = ref("");
    switch (order.seat_type) {
      case "first":
        seatTypeText.value = "一等座";
        break;
      case "second":
        seatTypeText.value = "二等座";
        break;
      case "business":
        seatTypeText.value = "商务座";
        break;
      default:
        seatTypeText.value = "未知";
        break;
    }
    const orderDetailDialog = ref(false);

    // 计算身份证号码的掩码形式
    const maskedIdentity = computed(() => {
      // 将身份证号码转换为字符串
      const identity = order.passenger.identity.toString();
      // 获取身份证号码的长度
      const length = identity.length;
      // 如果身份证号码长度小于3，则返回原始身份证号码
      if (length < 3) return identity;
      // 获取需要替换为"*"的长度（身份证号码中间部分）
      const replaceLength = length - 7;
      // 构建掩码字符串
      const maskedString = "*".repeat(replaceLength);
      // 将身份证号码的中间部分替换为掩码字符串
      return identity.substring(0, 3) + maskedString + identity.substring(length - 4);
    });
    console.log(order.seat_type);


    return {
      cancelOrder,
      openModifyDialog,
      closeModifyDialog,
      closeCancelDialog,
      openCancelDialog,
      modifyOrder,
      orderDetailDialog,
      maskedIdentity,
      seatTypeText
    };
  },

  methods: {
    formToDate
    // 这里可以添加其他需要的方法
  }
}
</script>
<style scoped>
.ticket-level {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgba(22, 97, 203, 0.796)
}
@import "@/assets/css/basic.css";
@import "@/assets/css/card-order.css";
</style>