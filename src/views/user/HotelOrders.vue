<template>
  <!--  TODO: 加上下拉菜单选择排序方式 -->
  <div></div>

  <el-card v-if="hotelOrders.length > 0" v-for="hotelOrder in hotelOrders " :key="hotelOrder.id" class="hotelCard" >
    <template #header>
      <el-row style="display: flex">
        <el-col :span="0.5">
          <el-icon>
            <House/>
          </el-icon>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-text v-if="hotelOrder.room" style="font-size: larger">{{ hotelOrder.room.hotel.name }}</el-text>
        </el-col>
        <el-col :span="1" :offset="13">
        </el-col>
        <span v-if="hotelOrder" style="color: orange;font-size: larger">已支付</span>
      </el-row>
    </template>
    <div style="display: flex">
      <div>
        <img :src="require('@/assets/images/carousel/image1.png')" height="100px" width="150px">
      </div>
      <div style="margin-left: 5%">
        <el-row>
          <span style="font-size: larger; font-weight: bold; margin-top: 10%">{{ hotelOrder.check_in_date }}-{{ hotelOrder.check_out_date }} | {{ hotelOrder.room.room_type }}</span>
        </el-row>
        <el-row>
          <span style="color: #6b778c; margin-top: 10%">总价：￥{{ hotelOrder.room.price }}</span>
        </el-row>
      </div>
    </div>
    <template #footer>
      <el-button @click="" style="border-radius: 10px">删除订单</el-button>
      <el-button @click="showDetailInfo(hotelOrder.id)" type="primary" style="border-radius: 10px">查看订单详情</el-button>
    </template>
  </el-card>
</template>
<script setup>
import {getServerUrl} from "@/util/request";
import timeUtil from "@/util/time";
import router from "@/router";
import {onMounted, ref} from "vue";
import requestUtil from "@/util/request";
import cookieUtil from "@/util/cookie";
// const showDetailInfo = async(id) => {
//   await router.push({path: '/hotelOrderInfo', query: {
//     hotelOrderId: id
//     }});
// }
const hotelOrders = ref([]);
onMounted(async()=> {
  const res = await requestUtil.get("/totalorder/getAllHotelReservations",{
    "userId": cookieUtil.getCookie("userId")
  })
  console.log(res.data);
  hotelOrders.value = res.data;
  hotelOrders.value.forEach(item=> {
    switch (item.room.room_type) {
      case "SINGLE":
        item.room.room_type = "单人间";
        break;
      case "DOUBLE":
        item.room.room_type = "双人间";
        break;
      case "SUITE":
        item.room.room_type = "套房";
        break;
      default:
        item.room.room_type = "未确定";
        break;
    }
    console.log(timeUtil.formToDate(item.check_in_date));
    item.check_in_date = timeUtil.formToDate(item.check_in_date);
    item.check_out_date = timeUtil.formToDate(item.check_out_date);
    // switch (item.state) {
    //   case "Pending Payment":
    //     item.state = "等待支付";
    //     break;
    //   case "Paid":
    //     item.state = "已支付";
    //     break;
    //   case "Cancelled":
    //     item.state = "已取消";
    // }
  })

})
</script>
<style scoped>
.hotelCard {
  width: 45%;
  margin: 10px 10px 10px 10px;
}
</style>