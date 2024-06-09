<template>
  <div class="home-box">
    <el-image style="width:100%;" :fit="contain" :src="require('@/assets/images/Hotel/topPic.jpg')" class="hotel-page-image" alt="顶部图片" />
    <div class="hotel-prepare-page">
      <div class="info-card-name">订单信息</div>
      <div class="info-card">
        <div class="hotel-info">
          <div class="term">
            <span class="term-name">酒店名称：</span>
            <span class="term-content">{{ hotel.name }}</span>
          </div>
          <div class="term">
            <span class="term-name">房间类型：</span>
            <span class="term-content">{{ nameIs(room_type) }}</span>
          </div>
          <div class="term">
            <span class="term-name">用户名称：</span>
            <span class="term-content">{{ user_name }}</span>
          </div>
        </div>
        <div class="user-info"></div>
      </div>

      <div class="pay-choice">
        <div style="font-family: 微软雅黑;
          font-size: 30px;
          color: #9eb5ff;
          margin-bottom: 2%;">请选择支付方式:  </div>
        <el-radio-group v-model="selectedPaymentMethod" class="selector">
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

        <span class="ticket-price">支付总额：￥{{ orderHotel.payment }}</span>
      </div>

      <div class="buttons">
        <el-button @click="openDialog" type="primary" style="margin-left:20%;margin-top:20px;height:40px;width:200px">预定
        </el-button>
        <el-button @click="backToDetail" style="margin-left:20%;margin-top:20px;height:40px;width:200px">取消
        </el-button>
      </div>
    </div>

    <el-dialog v-model="dialogVisible">
      <div  class="dialog-greeting">汪汪旅途提醒您：</div>
      <div class="dialog-content">
        您的订单已经创建，请您务必仔细看清您的订单信息是否正确，然后再进行支付哦！
      </div>
      <el-button @click="confirmOrder" type="primary" style="margin-left:15%;margin-top:10px;height:40px;width:200px">确认支付
      </el-button>
      <el-button @click="cancelOrder" style="margin-left:20%;margin-top:10px;height:40px;width:200px">取消订单
      </el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import requestUtil from "@/util/request";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import timeUtil from "@/util/time";
import cookieUtil from "@/util/cookie";
import router from "@/router";
import messageUtil from "@/util/message";
const route = useRoute();
const order_id = ref(route.query.res_id);
const orderHotel = ref([]);
const selectedPaymentMethod = ref("");
const dialogVisible = ref(false);
const hotel_id = ref(route.query.hotel_id);
const hotel = ref([]);
const user_name = ref("");
const room_type = ref(route.query.room_type);

onMounted(async() => {
  const order = await requestUtil.get('/totalorder/get/'+ order_id.value);
  orderHotel.value = order.data;
  const h = await requestUtil.get('/hotels/'+ hotel_id.value);
  hotel.value = h.data;

  user_name.value = cookieUtil.getCookie("userName");

  console.log(orderHotel.value);
})

const nameIs = (a) => {
  if (a === "SINGLE") return "单人间"
  else if (a === "DOUBLE") return "双人间"
  else return "套房"
};

const openDialog = async () => {
  if(selectedPaymentMethod.value == "") {
    ElMessage({
      message: "请选择支付方式！",
      type: "warning"
    });
    return;
  }

  dialogVisible.value = true;
};

const confirmMessage = async () => {
  await messageUtil.createMessage("汪汪旅途", cookieUtil.getCookie("userId"), "酒店预订成功", `您在${hotel.value.name}预定房间成功，祝您旅途愉快，汪汪~`)
}

const cancelMessage = async () => {
  await messageUtil.createMessage("汪汪旅途", cookieUtil.getCookie("userId"), "酒店取消成功", `您在${hotel.value.name}预订房间已经取消，您没地方住了哦，祝您旅途愉快以及各种愉快，汪汪~`)
}

const backToDetail = () => {
  try{
    router.push({path: '/search/room', query:
          {"hotel_id" : hotel_id.value}});
  }catch (e) {
    console.error(e);
  }
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
    "id": order_id.value
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
  ElMessage.success('预订成功');
  await confirmMessage();
  dialogVisible.value = false;
}

const cancelOrder = async() =>{
  //确认订单
  const res = await requestUtil.post('/totalorder/cancel', {
    "id": order_id.value
  })
      .then(response => {
        // 请求成功处理
        console.log(response.data);
      })
      .catch(error => {
        // 请求失败
        console.error(error);
      });
  ElMessage.success('取消预订成功');
  await cancelMessage();
  dialogVisible.value = false;
}
</script>

<style scoped>
.home-box {
  position: relative;
  width: 102.9%;
  height: 107%;
  margin-top: -50px;
  margin-left: -20px;
  margin-right: -20px;
  background-color: #101e41;
  overflow: auto;
}

.hotel-prepare-page {
  padding: 0px;
  margin-left: 5%;
  margin-right: 5%;
}

.info-card-name {
  font-family: 微软雅黑;
  font-size: 30px;
  margin-left: 5%;
  margin-top: 5%;
  color: #9eb5ff;
}

.info-card {
  margin-left: 10%;
  margin-top: 3%;
  width: 80%;
  background: linear-gradient(#101e41, #1e2548);
  font-family: 微软雅黑;
  font-size: 20px;
  color: white;
  padding-bottom: 1%;
}

.term {
  margin-bottom: 3%;
}

.term-name {
  font-weight: bold;
}

.term-content {
  font-weight: normal;
  margin-left: 20%;
}

.selector {
  margin-left: 3%;
}

.icon-wechat {
  background-image: url('~@/assets/images/payMethod/wechat.png'); /* 使用webpack的别名指向图片路径 */
  background-size: contain; /* 调整图片尺寸 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  width: 120px; /* 设置图标宽度 */
  height: 150px; /* 设置图标高度 */
  display: inline-block; /* 将图标设置为行内块元素 */
}

.icon-alipay {
  background-image: url('~@/assets/images/payMethod/alipay.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 120px;
  height: 150px;
  display: inline-block;
}

.icon-bank {
  background-image: url('~@/assets/images/payMethod/bank.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 120px;
  height: 150px;
  display: inline-block;
}

.ticket-price {
  margin-left: 15%;
  font-size: 40px;
  font-weight: bold;
  color: #f6392bd0;
}

.pay-choice {
  margin-left: 5%;
  background: linear-gradient(#101e41, #1e2548);
}

.buttons {
  margin-bottom: 5%;
}

.dialog-greeting {
  font-weight: bold;
  font-size: 30px;
  font-family: 微软雅黑;
  margin-bottom: 3%;
}

.dialog-content {
  font-size: 25px;
  font-family: 微软雅黑;
  text-space: 35px;
}
</style>