<template>
  <div class="center">
    <el-card style="width: 60%">
      <el-page-header :icon="ArrowLeft" @back="$router.push('/user/hotelOrders')">
        <template #content>
          <el-row>
          <span class="text-large font-600 mr-3">订单号:{{ hotelOrderId }}</span>
          </el-row>

        </template>
        <div style="display: flex; margin-top: 20px; margin-left: 20px; margin-bottom: 5%">
          <div>
            <el-icon size="100" color="green"><CircleCheck /></el-icon>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="font-size: 30px;">已完成</span>
          </div>
        </div>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-button style="width: 100%; height: 130%" @click="deleteVisible = true">删除订单</el-button>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-button style="width: 100%; height: 130%" type="primary">再次订购</el-button>
          </el-col>
        </el-row>
      </el-page-header>
        <hr style="margin-top: 5%">
        <el-row>
          <el-col :span="3" :offset="1" style="margin-top: 1%">
          <span style="font-weight: bold; font-size: large">订单详情：</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 2%; color: #6b778c">
          <el-col :offset="1" :span="20">
            <span>订单号：111</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 2%; color: #6b778c">
          <el-col :offset="1" :span="20">
            <span>入住人：王思翔</span>
          </el-col>
        </el-row>
      <el-row style="margin-top: 2%; color: #6b778c">
        <el-col :offset="1" :span="20">
          <span>手机号：18843331089</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 2%; color: #6b778c">
        <el-col :offset="1" :span="20">
          <span>身份信息：{{ maskedIdentity }}</span>
        </el-col>
      </el-row>
        <el-row style="margin-top: 2%; color: #6b778c">
          <el-col :offset="1" :span="20">
            <span>支付金额：￥1145</span>
          </el-col>
        </el-row>
      <el-row style="margin-top: 2%; color: #6b778c">
        <el-col :offset="1" :span="20">
          <span>入住房型：单人间</span>
        </el-col>
      </el-row>
      <div class="component">
      <hr>
      </div>
      <el-row style="margin-top: 2%; color: #6b778c">
        <el-col :offset="1" :span="20">
          <span>酒店详情：</span>
        </el-col>
      </el-row>
      <el-card class="hotel-card" @click="handleViewDetails" style="margin-top: 5%">
        <el-row style="margin-top: 2%; margin-left: 1%; margin-right: 1%;" class="hotel-row">
          <el-col :span="10">
            <el-image :fit="cover" :src="hotel.picturePath" class="hotel-image" alt="酒店图片" />
          </el-col>
          <el-col :span="8" :offset="1">
            <div class="hotel-info">
              <h3 style="font-family: 微软雅黑; font-size: 25px; margin-bottom: 2%">{{ hotel.name }}</h3>
              <div class="rating">
                <el-rate
                    v-model="hotel.score"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    :low-threshold="3"
                    :high-threshold="5"
                    show-score
                    disabled
                ></el-rate>
              </div>
              <p style="color: #9eb5ff;
                      font-family: 微软雅黑;
                      font-size: 16px;
                      margin-bottom: 2%;
                      line-height: 24px">{{ hotel.address }}</p>
              <p style="color: #9eb5ff;
                      font-family: 微软雅黑;
                      font-size: 16px;
                      margin-bottom: 2%;
                      line-height: 24px">{{ hotel.description }}</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="price-details">
              <div class="price">
                <span style="font-size: 14px">￥</span>
                <span>{{ hotel.price }}</span>
                <span style="font-size: 14px">起</span>
              </div>
              <el-button style="margin-top: 7%" size="large" round type="primary" @click="handleViewDetails">
                <div style=" font-weight: bold">查看详情</div>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
  <el-dialog v-model="deleteVisible" title="删除订单">
    <span>您确定要删除该订单吗？</span>
    <template #footer>
      <el-button type="primary" @click="deleteVisible = false">返回</el-button>
      <el-button type="default" @click="console.log('delete')">残忍删除</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";
import {computed, onMounted, ref} from "vue";
import requestUtil from "@/util/request"
const route = useRoute();
const hotelOrderId = route.query.hotelOrderId;
const deleteVisible = ref(false);
const passenger = ref([]);
onMounted(async()=> {
  const res = await requestUtil.get('')
})
// 计算身份证号码的掩码形式
const maskedIdentity = computed(() => {
  // 将身份证号码转换为字符串
  const identity = passenger.identity.toString();
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
});const hotel = ref(  {
  picturePath: require('@/assets/images/carousel/image1.png'),
  score: 4.9,
  name: "北京第十四酒店",
  description: "北京第十四家酒店，不是北京第四十号酒店，也不是北京第四十四号酒店",
  address: "北京市海淀区",
  price: 329,
});
console.log(hotelOrderId);
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
/* 可以添加样式 */
.hotel-card {
  display: flex;
  flex-direction: column;
  height: 280px;
}

.hotel-card:hover {
  display: flex;
  flex-direction: column;
  height: 280px;
}
.price-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-top: 15%;
}
</style>