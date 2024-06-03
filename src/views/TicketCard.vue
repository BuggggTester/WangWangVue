<template>
  <div @click="goToTicketDetail">
    <el-card class="ticket-card" shadow="dark">
    <div class="ticket-info">
      <el-row class="component">
        <el-col :span="6" class="ticket-time">{{ ticket.departureTime }}</el-col>
        <el-col :span="6" class="trip-no">
          <div class="underline-container">
            <span class="underline-text">{{ ticket.trainNumber }}</span>
          </div>
        </el-col>
        <el-col :span="6" class="ticket-time">{{ ticket.arrivalTime }}</el-col>
        <el-col :span="6" class="ticket-price">{{ ticket.price }}</el-col>
      </el-row>
      <el-row class="component">
        <el-col :span="6" class="ticket-place">
          <span v-if="ticket.departureHighlight" class="highlight-orange-text">始</span>{{ ticket.departure }}
        </el-col>
        <el-col :span="6" class="time">{{ ticket.duration }}</el-col>
        <el-col :span="6" class="ticket-place">
          <span v-if="ticket.arrivalHighlight" class="highlight-green-text">终</span>{{ ticket.destination }}
        </el-col>
        <el-col :span="6" class="availability" v-if="ticket.available">有票</el-col>
        <el-col :span="6" class="availability" v-else>无票</el-col>
      </el-row>
    </div>
    <template #footer>
      <el-row>
        <el-col :span="8">
          <span style="align-items: center">二等：<span style="color:#42b983">{{ ticket.secondClass }}</span></span>
        </el-col>
        <el-col :span="8">
          <span style="align-items: center">一等：<span style="color:#42b983">{{ ticket.firstClass }}</span></span>
        </el-col>
        <el-col :span="8">
          <span style="align-items: center">商务：<span style="color:#42b983">{{ ticket.business }}</span></span>
        </el-col>
      </el-row>
    </template>
  </el-card>
  </div>
</template>
  
<script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const props = defineProps({
    ticket: {
      type: Object,
      required: true
    }
  });
  const goToTicketDetail = () => {
    //console.log(ticket);
    router.push('/TicketDetail');
  }
</script>
  
<style scoped>
  .ticket-card {
    width: 95%;
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


  