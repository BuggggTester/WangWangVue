<template>
  <!--  TODO: 加上下拉菜单选择排序方式 -->
  <div></div>
  <el-card class="hotelCard" @click="showDetailInfo">
    <template #header>
      <el-row style="display: flex">
        <el-col :span="0.5">
          <el-icon>
            <House/>
          </el-icon>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-text style="font-size: larger">这是酒店名字</el-text>
        </el-col>
        <el-col :span="1" :offset="13">
        </el-col>
        <span style="color: orange;font-size: larger">已支付</span>
      </el-row>
    </template>
    <div style="display: flex">
      <div>
        <img :src="require('@/assets/images/carousel/image1.png')" height="100px" width="150px">
      </div>
      <div style="margin-left: 5%">
        <el-row>
          <span style="font-size: larger; font-weight: bold; margin-top: 10%">2月22日-2月24日 | 2间 | 双人间</span>
        </el-row>
        <el-row>
          <span style="color: #6b778c; margin-top: 10%">总价：￥1173.22</span>
        </el-row>
      </div>
    </div>
    <template #footer>
      <el-button>删除订单</el-button>
    </template>
  </el-card>
</template>
<script setup>
import {getServerUrl} from "@/util/request";
import router from "@/router";
import {ref} from "vue";
const hotelOrderId = ref(1);
const showDetailInfo = async() => {
  await router.push({path: '/hotelOrderInfo', query: {
    hotelOrderId: hotelOrderId.value
    }});

}
</script>
<style scoped>
.hotelCard {
  width: 45%;
  margin: 10px 10px 10px 10px;
}
</style>