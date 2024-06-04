<template>
  <div class="center">
    <el-card style="width: 60%">
      <el-page-header :icon="ArrowLeft">
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
            <span>支付金额：￥1145</span>
          </el-col>
        </el-row>
      <el-card style="margin-top: 5%">

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
import {ref} from "vue";

const route = useRoute();
const hotelOrderId = route.query.hotelOrderId;
const deleteVisible = ref(false);
console.log(hotelOrderId);
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
/* 可以添加样式 */
</style>