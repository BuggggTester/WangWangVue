<script setup>
import {onMounted, ref} from "vue";
import requestUtil, {getServerUrl} from "@/util/request"
import {inputNumberEmits} from "element-plus";
import { useRoute } from "vue-router";
import {ElMessage} from "element-plus";
import router from "@/router";
import messageUtil from "@/util/message"
import cookieUtil from "@/util/cookie"

const route = useRoute();
let foods = ref([])
let number = ref(0)
let rows = ref(0)
console.log(route.query.trainId);
let cols = ref([])
onMounted(async () => {
  const rec = await requestUtil.get('food/select/tripId', {
    "trainId": route.query.trainId,
    "time": route.query.time
  })
  foods.value = rec.data
  foods.value.forEach(item=> {
    item.quantity = 0;
  })
  console.log(foods.value)
  number.value = foods.value.length
  rows.value = Math.floor((number.value - 1) / 3) + 1
  while (number.value > 0){
    cols.value.push(number.value < 3 ? number.value : 3)
    number.value -= 3
  }
  console.log(rows.value)
  console.log(cols.value)
})

const handleChange = (food) => {
}

const selectedPaymentMethod = ref("");
const dialogVisible = ref(false);

const openDialog = async (food) => {
    dialogVisible.value = true;
    await createOrder(food); // 在打开对话框前执行createOrder
};
const totalOrderId = ref('');
const createOrder = async(food) =>{
  // 发送创建食物订单的请求
  const res = await requestUtil.post('/food/create/reservation', {
    "user_id": cookieUtil.getCookie("userId"),
    "food_id":food.id,
    "quantity":food.quantity,
    "trip_id":route.query.trainId
  });
  const res2 = await requestUtil.post('/totalorder/create',{
    "food_id": food.id,
    "user_id": cookieUtil.getCookie("userId"),
    "quantity": food.quantity,
    "order_type": "TRAIN_MEAL",
    "reservation_id": res.data.reservationId,
    "payment": food.price * food.quantity
  });
  totalOrderId.value = res2.data.id;
  console.log(totalOrderId.value);
}

const confirmOrder = async() =>{
  if(selectedPaymentMethod.value == "") {
        ElMessage({
            message: "请选择支付方式！",
            type: "warning"
        });
        return;
    }
  //确认订单
  const res = await requestUtil.get('/totalorder/confirm',{
    "id": totalOrderId.value
  })
  .then(response => {
    // 请求成功处理
    console.log(response.data);
    console.log(res.data);
  })
  .catch(error => {
    // 请求失败
    console.error(error);
  });
  ElMessage.success('订餐成功');
  await confirmMessage();
  dialogVisible.value = false;
}

const cancelOrder = async() =>{
  //确认订单
  const res = await requestUtil.post('/order/cancel', {
      state: "canceled"
  })
  .then(response => {
    // 请求成功处理
    console.log(response.data);
  })
  .catch(error => {
    // 请求失败
    console.error(error);
  });
  ElMessage.success('取消订餐成功');
  await cancelMessage();
  dialogVisible.value = false;
}

const confirmMessage = async () => {
    await messageUtil.createMessage("汪汪旅途", cookieUtil.getCookie("userId"), "火车餐订购成功", `您的${route.query.trainId}车次的火车餐已购买成功，祝您旅途愉快以及用餐愉快，汪汪~`)
}

const cancelMessage = async () => {
    await messageUtil.createMessage("汪汪旅途", cookieUtil.getCookie("userId"), "火车餐取消成功", `您的${route.query.trainId}车次的火车餐已取消，您没饭吃了哦，祝您旅途愉快以及各种愉快，汪汪~`)
}

const backToMain = () => {
    router.push({path: '/main'});
}

</script>

<template>
  <el-page-header :icon="ArrowLeft" @back="backToMain">
    <template #content>
      <p style="font-size: 25px; font-family: serif; margin-bottom: 10px">&nbsp;&nbsp;火车餐购买</p>
    </template>
  </el-page-header>
  <div>
    <el-scrollbar height="100%">
      <el-row v-for="i in rows" :gutter="20" justify="space-around">
        <el-col v-for="j in cols[i-1]" :key="j" :span="7">
          <el-card class="card" shadow="always" :body-style="{height:'125px', width:'100%', boxSizing:'border-box'}">
            <template #header><p style="font-size: 20px">{{ foods[j - 1 + (i-1) * 3].name}}</p></template>
            <el-row :gutter="50">
              <el-col :span="10">
                <img :src="getServerUrl() + foods[j - 1 + (i-1) * 3].picture_path" width="170"/>
              </el-col>
              <el-col :span="13">
                <p style="color: #6b778c">{{ foods[j - 1 + (i-1) * 3].description}}</p>
              </el-col>
            </el-row>
            <template #footer class=".el-card__footer">
              <el-row :gutter="15">
                <el-col :span="6"><p style="font-size: 20px; margin-top: 5px; color: #ff8800" type="flex" >￥{{ foods[j - 1 + (i-1) * 3].price}}</p></el-col>
                <el-col :span="8"><el-input-number  v-model="foods[j - 1 + (i-1) * 3].quantity" :min="1" :max="10" @change="handleChange(foods[j - 1 + (i-1) * 3])" /></el-col>
                <el-col :span="10"><el-button type="primary" plain class="button" @click="openDialog(foods[j - 1 + (i-1) * 3])">立即购买</el-button></el-col>
              </el-row>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>

  <el-dialog v-model="dialogVisible">
    <el-card>
        <span style="font-size: larger">请选择支付方式:  </span>
        <div class="component">
          <hr>
        </div>
        <el-radio-group v-model="selectedPaymentMethod">

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

        <el-button @click="confirmOrder" type="primary" style="margin-left:15%;margin-top:10px;height:40px;width:200px">确认支付
        </el-button>
        <el-button @click="cancelOrder" style="margin-left:20%;margin-top:10px;height:40px;width:200px">取消订单
        </el-button>
    </el-card>
  </el-dialog>

</template>

<style>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.card{
  width: 100%;
  height: 240px;
  margin: 10px;
}
p{
  word-wrap: break-word;
  word-break: break-all;
}
button{
  margin-left: 50%;
}
.el-card__footer {
  border-top: 1px solid var(--el-card-border-color);
  box-sizing: border-box;
  padding: calc(var(--el-card-padding) - 8px) var(--el-card-padding);
}
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