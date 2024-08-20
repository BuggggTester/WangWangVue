<template>
  <el-card style="width: 70%">
    <el-page-header>
      <template #content>
        <span style="font-size: large; font-weight: 600; margin-right: 3%;white-space: nowrap"> 火车餐订单 </span>
      </template>
    </el-page-header>
    <div class="component">
      <hr>
    </div>
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
            <span style="color: #6b778c; margin-top: 10%">餐品数量：{{ foodOrder.quantity }}</span>
          </el-row>
          <el-row>
            <span style="color: #6b778c; margin-top: 10%">总价：￥{{ (foodOrder.quantity * foodOrder.food.price).toFixed(2) }}</span>
          </el-row>

        </div>
      </div>
      <template #footer>
        <div style="display: flex">
          <el-button v-if="foodOrder.state == '待支付' || foodOrder.state == 'PENDING_PAYMENT' " @click="foodOrder.dialogVisible = true" plain>{{ foodOrder.buttonText }}</el-button>
          <el-button v-else disabled="true" plain>{{ foodOrder.buttonText }}</el-button>
          <el-button v-if="foodOrder.state == '已取消' || foodOrder.state == 'CANCELLED'" disabled="true" type="danger" plain>订单已取消</el-button>
          <el-button v-else @click="cancelOrder(foodOrder)" type="danger" plain>取消订单</el-button>
        </div>
        <el-dialog v-model="foodOrder.dialogVisible">
          <el-card>
            <span style="font-size: larger">请选择支付方式:  </span>
            <div class="component">
              <hr>
            </div>
            <el-radio-group v-model="foodOrder.paymentMethod">

              <el-radio-button label="wechat">
                <i class="icon-wechat"></i>
              </el-radio-button>
              <el-radio-button label="alipay">
                <i class="icon-alipay"></i>
              </el-radio-button>
              <el-radio-button label="bank">
                <i class="icon-bank"></i>
              </el-radio-button>
            </el-radio-group>

            <el-button @click="confirmOrder(foodOrder)" type="primary" style="margin-left:15%;margin-top:10px;height:40px;width:200px">确认支付
            </el-button>
            <el-button @click="foodOrder.dialogVisible = false" style="margin-left:20%;margin-top:10px;height:40px;width:200px">返回
            </el-button>
          </el-card>
        </el-dialog>
        <el-collapse v-model="foodOrder.active">
        <el-collapse-item  name="1" title="点击显示更多信息">
          <el-row>
            <span>乘车人：{{ foodOrder.user.user_name }}</span>
          </el-row>
          <el-row>
            <span>出行车次：{{ foodOrder.food.trip.train_id }}</span>
          </el-row>
          <el-rol>
            <span>下单时间：{{ foodOrder.order_time }}</span>
          </el-rol>
          <el-row>
            <span>支付状态：{{ foodOrder.state }}</span>
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
import {formatTime} from "element-plus/es/components/countdown/src/utils";
import {formatDate} from "@/util/time";
import {ElMessage} from "element-plus";
import messageUtil from "@/util/message";
const foodOrders = ref([]);
onMounted(async()=> {
  const res = await requestUtil.get('/totalorder/getAllFoodReservations',{
    "userId": cookieUtil.getCookie("userId")
  })
  foodOrders.value = res.data;
  foodOrders.value.forEach(item=> {
    item.active = false;
    item.order_time = formatDate(item.order_time);
    item.dialogVisible = false;
    item.paymentMethod = "";
    console.log(item.state);
    switch (item.state) {
      case "PENDING_PAYMENT":
        item.state = "待支付";
        break;
      case "PAID":
        item.state = "已支付";
        break;
      case "CANCELLED":
        item.state = "已取消";
        break;
      default:
        item.state = "未找到";
        break;
    }
    if(item.state == "待支付") {
      item.buttonText = "点击支付";
    }else{
      item.buttonText = "已支付"
    }
  })
  console.log(foodOrders.value);
})
const confirmOrder = async(order)=> {
  if(order.paymentMethod == "") {
    ElMessage({
      message: "请选择支付方式！",
      type: "warning"
    });
    return;
  }
  //确认订单
  const res = await requestUtil.get('/totalorder/pay',{
    "id": order.tid
  });
  console.log(res.data);
  ElMessage.success('订餐成功');
  await confirmMessage(order);
  order.dialogVisible = false;
  setTimeout(function(){
    location.reload();
  },300);
}
const confirmMessage = async (order) => {
  console.log(order);
  await messageUtil.createMessage("汪汪旅途", cookieUtil.getCookie("userId"), "火车餐订购成功", `您的${order.food.trip.train_id}车次的火车餐已购买成功，祝您旅途愉快以及用餐愉快，汪汪~`)
}
const cancelOrder = async(order) => {
  const res = await requestUtil.get('/totalorder/cancel',{
    "id": order.tid
  })
  ElMessage.success('订单已取消！');
  setTimeout(function () {
    location.reload();
  },300);
}
</script>
<style scoped>
@import "@/assets/css/basic.css";
.icon-wechat {
  background-image: url('~@/assets/images/payMethod/wechat.png'); /* 使用webpack的别名指向图片路径 */
  background-size: contain; /* 调整图片尺寸 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  width: 160px; /* 设置图标宽度 */
  height: 200px; /* 设置图标高度 */
  display: inline-block; /* 将图标设置为行内块元素 */
}

.icon-alipay {
  background-image: url('~@/assets/images/payMethod/alipay.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 160px;
  height: 200px;
  display: inline-block;
}

.icon-bank {
  background-image: url('~@/assets/images/payMethod/bank.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 160px;
  height: 200px;
  display: inline-block;
}
</style>