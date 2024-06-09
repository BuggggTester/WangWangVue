<template>
  <div @click="goToTicketDetail">
    <el-card class="ticket-card" shadow="dark">
      <div class="ticket-info">
        <el-row class="component">
          <el-col :span="6" class="ticket-time">{{ ticket.start_time }}</el-col>
          <el-col :span="6" class="trip-no">
            <div class="underline-container">
              <span class="underline-text">{{ ticket.train_id }}</span>
            </div>
          </el-col>
          <el-col :span="6" class="ticket-time">{{ ticket.end_time }}</el-col>
          <el-col :span="6" class="ticket-price">￥{{ ticket.price }}起</el-col>
          <!--TODO: 等后端完善，传入price属性-->
        </el-row>
        <el-row class="component">
          <el-col :span="6" class="ticket-place">
            <span v-if="ticket.departureHighlight" class="highlight-orange-text">始</span>{{ ticket.from_place }}
          </el-col>
          <el-col :span="6" class="time">{{ ticket.duration }}</el-col>
          <!--TODO: 等后端完善，传入时间属性-->
          <el-col :span="6" class="ticket-place">
            <span v-if="ticket.arrivalHighlight" class="highlight-green-text">终</span>{{ ticket.to_place }}
          </el-col>
          <el-col :span="6" class="availability" v-if="ticket.first_seat > 0 || ticket.second_seat > 0">有票</el-col>
          <el-col :span="6" class="unavailability" v-else>无票</el-col>
        </el-row>
      </div>
      <template #footer>
        <el-row>
          <el-col :span="8">
            <span style="align-items: center">二等：<span style="color:#42b983">{{ ticket.secondSeats }}</span></span>
          </el-col>
          <el-col :span="8">
            <span style="align-items: center">一等：<span style="color:#42b983">{{ ticket.firstSeats }}</span></span>
          </el-col>
                <el-col :span="8">
                  <span style="align-items: center">商务：<span style="color:#42b983">有座</span></span>
          </el-col>
        </el-row>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import requestUtil from '@/util/request'
import router from "@/router";

const route = useRoute();
const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
});

const goToTicketDetail = () => {
  let param = {
    "trip_id": props.ticket.trip_id,
    "fromPlace": props.ticket.from_place,
    "toPlace": props.ticket.to_place,
    "startTime": route.query.startTime
  };
  router.push({path:'/TicketDetail',query: param});
}

onMounted(async () => {
  const res2 = await requestUtil.get('/trip/sum', {
    "tripId": props.ticket.trip_id,
    "fromPlace": route.query.fromPlace,
    "toPlace": route.query.toPlace

  })
  const res3 = await requestUtil.get('/trip/minPrice', {
    "tripId": props.ticket.trip_id,
    "fromPlace": route.query.fromPlace,
    "toPlace": route.query.toPlace
  })
  if(res2.data.firstSeats < 20) {
    props.ticket.first_seat = res2.data.firstSeats;
    props.ticket.firstSeats = res2.data.firstSeats + "张";
  }else{
    props.ticket.first_seat = res2.data.firstSeats;
    props.ticket.firstSeats = "有座";
  }
  if(res2.data.secondSeats < 20) {
    props.ticket.second_seat = res2.data.secondSeats;
    props.ticket.secondSeats = res2.data.secondSeats + "张";
  }else{
<<<<<<< HEAD
=======
    props.ticket.second_seat = res2.data.secondSeats;
>>>>>>> 4b8f795e4a920b6f42cd6db3e9e02459159d3c7c
    props.ticket.secondSeats = "有座";
  }
  props.ticket.duration = res2.data.time;
  props.ticket.price = res3.data.minPrice;
})
console.log(props.ticket.second_seat);
console.log(props.ticket.first_seat);
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

.unavailability {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #e11a1a;
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


  