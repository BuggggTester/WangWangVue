<template>
    <!-- <el-card class="ticket-card" shadow="hover">
      <div class="ticket-info">
        <div class="train-number">{{ ticket.trainNumber }}</div>
        <div class="route">{{ ticket.departure }} - {{ ticket.destination }}</div>
        <div class="price">价格：{{ ticket.price }}元</div>
        <div class="availability" v-if="ticket.available">有票</div>
        <div class="availability" v-else>无票</div>
        <div class="train-number">K1234</div>
        <div class="route">北京 - 上海</div>
        <div class="price">¥200起</div>
        <div class="availability">有票</div>
        </div>
    </el-card> -->
    <el-card class="ticket-card" shadow="dark" @click="dialogVisible = true">
      <div class="ticket-info">
        <el-row class="component">
          <el-col :span="6" class="ticket-time">07:00</el-col>
          <el-col :span="6" class="trip-no">
            <div class="underline-container">
              <span class="underline-text">G87</span>
            </div>
          </el-col>
          <el-col :span="6" class="ticket-time">14:33</el-col>
          <el-col :span="6" class="ticket-price">¥200起</el-col>
        </el-row>
        <el-row class="component">
          <el-col :span="6" class="ticket-place">
            <span class="highlight-orange-text">始</span>北京西
          </el-col>
          <el-col :span="6" class="time">7小时33分</el-col>
          <el-col :span="6" class="ticket-place">
            <span class="highlight-green-text">终</span>成都东
          </el-col>
          <el-col :span="6" class="availability" >有票</el-col>
        </el-row>
    </div>
      <template #footer>
        <el-row>
          <el-col :span="8">
            <span style="align-items: center">二等：<span style="color:#42b983">10张</span></span>
          </el-col>
          <el-col :span="8">
            <span style="align-items: center">一等：<span style="color:#42b983">10张</span></span>
          </el-col>
          <el-col :span="8">
            <span style="align-items: center">商务：<span style="color:#42b983">10张</span></span>
          </el-col>
        </el-row>
      </template>
  </el-card>
  <el-dialog v-model="dialogVisible"
             title="火车票订购">
  <template #footer>
    <el-button type="default" @click="dialogVisible=false">返回</el-button>
    <el-button type="primary" @click="">购买</el-button>
  </template>
  </el-dialog>

  </template>
  
  <script>
  import {ref} from "vue";
  import router from "@/router";

  export default {
    name: 'TicketCard',
    methods: {
      router() {
        return router
      }
    },
    props: {
      ticket: Object,
    },
    setup(props) {
      const dialogVisible = ref(false);
      return {
        dialogVisible
      }
    },

  }
  </script>
  
  <style scoped>
  .ticket-card {
    width: 45%;
    border-radius: 4px;
  }
  
  .ticket-info {
    padding: 0px;
  }
  
  .ticket-time {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }

  .ticket-price {
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: #ff8800;
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

  @import "@/assets/css/card-order.css";
  </style>


  