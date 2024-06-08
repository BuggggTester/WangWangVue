<template>
  <div class="component">
    <el-page-header :icon="ArrowLeft" @back="backToInfo">
      <template #content>
        <span class="head-trip-info">车次详情</span>
      </template>
    </el-page-header>
  </div>
  <div class="component">
    <hr>
  </div>
  <el-card class="page-container">
    <div class="spacer"></div> <!-- 空的div调整间距用 -->

    <div>
      <div class="ticket-info">
        <el-row class="component">
          <el-col :span="8" class="ticket-time">{{ trip.start_time }}</el-col>
          <el-col :span="8" class="trip-no">
            <div class="underline-container">
              <span class="underline-text">时刻表</span>
            </div>
          </el-col>
          <el-col :span="8" class="ticket-time">{{ trip.end_time }}</el-col>
        </el-row>
        <el-row class="component">
          <el-col :span="8" class="ticket-place">{{ trip.from_place }}</el-col>
          <el-col :span="8" class="time">{{ trip.train_id }} · {{ duration }}</el-col>
          <el-col :span="8" class="ticket-place">{{ trip.to_place }}</el-col>
        </el-row>
      </div>


      <div class="buy-boarder">
        <el-row>
          <el-col :span="8" class="ticket-level">
                <span style="align-items: center">二等座 
                    <span class="availability" v-if="trip.first_seat > 0 || trip.second_seat > 0">有票</span>
                    <span :span="6" class="unavailability" v-else>无票</span>
                </span>
          </el-col>
          <el-col :span="8" class="ticket-price">
            ￥{{ price }}
          </el-col>
          <el-col :span="8" class="buy-nutton">
            <div class="button-container">
              <el-button @click="goToTicketOrderPrepare" type="primary" size="mini" style="height:40px;width:130px">
                订购
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="buy-boarder">
        <el-row>
          <el-col :span="8" class="ticket-level">
                <span style="align-items: center">一等座 
                    <span class="availability" v-if="trip.first_seat > 0 || trip.second_seat > 0">有票</span>
                    <span :span="6" class="unavailability" v-else>无票</span>
                </span>
          </el-col>
          <el-col :span="8" class="ticket-price">
            ￥{{ (price * 1.2).toFixed(2) }}
          </el-col>
          <el-col :span="8" class="buy-nutton">
            <div class="button-container">
              <el-button @click="goToTicketOrderPrepare" type="primary" size="mini" style="height:40px;width:130px">
                订购
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="buy-boarder">
        <el-row>
          <el-col :span="8" class="ticket-level">
                <span style="align-items: center">商务座 
                    <span class="availability" v-if="trip.first_seat > 0 || trip.second_seat > 0">有票</span>
                    <span :span="6" class="unavailability" v-else>无票</span>

                </span>
          </el-col>
          <el-col :span="8" class="ticket-price">
            ￥{{ (price * 1.5).toFixed(2) }}
          </el-col>
          <el-col :span="8" class="buy-nutton">
            <div class="button-container">
              <el-button @click="goToTicketOrderPrepare" type="primary" size="mini" style="height:40px;width:130px">
                订购
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>


      <div class="component">
        <el-button style="width: 100%;height:60px;" @click="chooseVisible = true"> + 点击选择乘车人</el-button>
      </div>

      <el-dialog v-model="chooseVisible">
        <div v-if="passengers.length > 0" v-for="passenger in passengers" :key="passenger.pid" style="margin-top: 3%">
          <IdentityCard :passenger="passenger"/>
        </div>
        <div class="component">
          <el-button style="width: 100%;" @click="addVisible = true"> + 点击添加乘车人</el-button>
        </div>
        <el-dialog v-model="addVisible">
          <div class="component">
            <hr style="color: #6b778c">
          </div>
          <div class="component">
            <span style="margin-right: 2%">请输入姓名：<span style="color: red">*</span></span>
            <el-input v-model="newName" placeholder="请输入名字" style="width: 65%;"/>
          </div>
          <div class="component">
            <span style="margin-right: 2%">请输入手机号：<span style="color: red">*</span></span>
            <el-input v-model="newPhone" placeholder="请输入手机号" style="width: 63%;"/>
          </div>
          <div class="component">
            <span style="margin-right: 2%">请输入身份证号：<span style="color: red">*</span></span>
            <el-input v-model="newIdentity" placeholder="请输入身份证号" style="width: 61%;"/>
          </div>
          <template #footer>
            <el-button type="default" @click="addVisible = false">返回</el-button>
            <el-button type="primary" @click="addPassenger">添加乘车人</el-button>
          </template>
        </el-dialog>
      </el-dialog>
    </div>
  </el-card>
</template>

<script setup>
import {useRoute} from 'vue-router';
import {defineProps, onMounted, ref} from 'vue';
import requestUtil from '@/util/request'
import timeUtil from '@/util/time'
import IdentityCard from "@/views/IdentityCard.vue";
import {ElMessage} from "element-plus";
import cookieUtil from "@/util/cookie"
import router from "@/router";
import time from '@/util/time';
import {ArrowLeft} from "@element-plus/icons-vue";

const route = useRoute();
const tripId = ref(route.query.trip_id);
const trip = ref("");
const duration = ref("");
const price = ref("");
const chooseVisible = ref(false);
const passengers = ref([]);
const addVisible = ref(false);
const newName = ref("");
const newPhone = ref("");
const newIdentity = ref("");

onMounted(async () => {
  try {
    const res4 = await requestUtil.get('/trip/select/tripId', {
      "tripId": tripId.value,
    });
    trip.value = res4.data;
    trip.value.start_time = timeUtil.stampToTime(timeUtil.formatDate(trip.value.start_time));
    trip.value.end_time = timeUtil.stampToTime(timeUtil.formatDate(trip.value.end_time));
  } catch (e) {
    console.error(e);
  }
  console.log(trip);
  const res5 = await requestUtil.get('/trip/sum', {
    "tripId": tripId.value,
    "fromPlace": trip.value.from_place,
    "toPlace": trip.value.to_place
  })
  const res6 = await requestUtil.get('/trip/minPrice', {
    "tripId": tripId.value,
    "fromPlace": trip.value.from_place,
    "toPlace": trip.value.to_place
  })
  trip.first_seat = res5.data.firstSeats;
  trip.second_seat = res5.data.secondSeats;
  duration.value = res5.data.time;
  price.value = res6.data.minPrice;

  const res = await requestUtil.get('/passenger/select/userId', {
    "userId": cookieUtil.getCookie("userId")
  })
  passengers.value = res.data;
  passengers.value.forEach(item => {
    item.dialogVisible = false;
  })
  console.log(passengers.value);
});
const backToInfo = () => {
  let param = {
    "fromPlace": route.query.fromPlace,
    "toPlace": route.query.toPlace,
    "startTime": route.query.startTime
  };
  router.push({path: '/ticket', query: param});
}
const addPassenger = async () => {
  try {
    const res = await requestUtil.post("/passenger/create", {
      "phoneNum": newPhone.value,
      "userId": cookieUtil.getCookie("userId"),
      "identity": newIdentity.value,
      "name": newName.value
    })
    console.log(res.data);
    if (res.data.msg == "create passenger success") {
      ElMessage({
        message: "创建成功！",
        type: "success"
      })
    } else if (res.data.msg == "passenger already exists") {
      ElMessage({
        message: "该用户已存在！",
        type: "warning"
      })
    }
    setTimeout(function () {
      location.reload();
    }, 500);
  } catch (e) {
    ElMessage({
      message: "创建失败",
      type: "error"
    })
  }

}

const orderDialogVisible = ref(false);
const selectedPaymentMethod = ref(null);

const order = () => {
  if (selectedPaymentMethod.value === 'wechat') {
    console.log('使用微信支付');
  } else if (selectedPaymentMethod.value === 'alipay') {
    console.log('使用支付宝支付');
  } else if (selectedPaymentMethod.value === 'bank') {
    console.log('使用银行卡支付');
  } else {
    console.log('请选择支付方式');
  }

  orderDialogVisible.value = false;
};

const goToTicketOrderPrepare = () => {
  let param = {
    "trip_id": tripId.value,
    "fromPlace": route.query.fromPlace,
    "toPlace": route.query.toPlace,
    "startTime": route.query.startTime
  };
  router.push({path: '/TicketOrderPrepare', query: param});
}
</script>

<style scoped>
.ticket-card {
  width: 95%;
  border-radius: 4px;
}

.ticket-info {
  padding: 40px;
  background-color: #c8eaf5;
  border-radius: 10px;
  margin-bottom: 20px;
}

.buy-boarder {
  padding: 40px;
  background-color: #c8eaf551;
  border-radius: 20px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 可选：设置容器的高度 */
}


.ticket-time {
  text-align: center;
  font-size: 55px;
  font-weight: bold;
}

.ticket-level {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgba(22, 97, 203, 0.796)
}

.ticket-price {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #f6392bd0;
}

.ticket-place {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.time {
  text-align: center;
  color: gray;
  font-size: 15px;
}

.availability {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #12a72b;
}

.unavailability {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #dc2323;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.highlight-orange-text {
  background-color: orange;
  color: white;
  padding: 1px 4px;
  border-radius: 5px;
}

.highlight-green-text {
  background-color: green;
  color: white;
  padding: 1px 4px;
  border-radius: 5px;

}

.spacer {
  margin-bottom: 30px; /* 根据需要调整间距 */
}

.page-container {
  background-color: rgba(177, 216, 238, 0.132);
  background-size: auto;
  width: 80%;
  margin-left: 10%;
}

.underline-container {
  position: relative;
  display: inline-block;
  font-size: 20px;
}

.underline-container::after {
  content: "";
  position: absolute;
  left: -300%; /* 左侧超出文本部分的长度 */
  right: -300%; /* 右侧超出文本部分的长度 */
  bottom: -20px; /* 控制下划线距离文本的位置 */
  height: 2px; /* 下划线的高度 */
  background-color: darkgray; /* 下划线颜色 */
}

.underline-text {
  position: relative;
  z-index: 1;
  font-size: 20px;
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


@import "@/assets/css/card-order.css";
</style>


