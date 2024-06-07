<template>
    <el-page-header :icon="ArrowLeft" @back="$router.push('/ticketinfo')">
        <template #content>
            <span class="head-trip-info">车次详情</span>
        </template>
    </el-page-header>

    <div class="spacer"></div> <!-- 空的div调整间距用 -->

    <div>
        <div class="ticket-info">
        <el-row class="component">
            <el-col :span="8" class="ticket-time">{{ $route.query.ticket.start_time }}</el-col>
            <el-col :span="8" class="trip-no">
            <div class="underline-container">
                <span class="underline-text">时刻表</span>
            </div>
            </el-col>
            <el-col :span="8" class="ticket-time">{{ ticket.end_time }}</el-col>
        </el-row>
        <el-row class="component">
            <el-col :span="8" class="ticket-place">{{ ticket.from_place }}</el-col>
            <el-col :span="8" class="time">{{ ticket.train_id }} · {{ ticket.duration }}</el-col>
            <el-col :span="8" class="ticket-place">{{ ticket.to_place}}</el-col>
        </el-row>
    </div>

    <div>
        <el-row>
            <el-col :span="8">二等座</el-col>
            <el-col :span="8" class="ticket-price">{{ ticket.price }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">一等座</el-col>
            <el-col :span="8" class="ticket-price">{{ ticket.price}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">商务座</el-col>
            <el-col :span="8" class="ticket-price">{{ }}</el-col>
        </el-row>
    </div>
        
    <h2>信息输入</h2>
        <el-form>
            <el-form-item label="姓名">
            <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
            <el-input v-model="idNumber"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
            <el-input v-model="phoneNumber"></el-input>
            </el-form-item>
        </el-form>
    
        <el-button @click="order">订购</el-button>
        <h2>座位选择</h2>
        <!-- 这里放置座位选择组件 -->
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {defineProps, onMounted,ref} from 'vue';
import requestUtil from '@/util/request'
import router from "@/router";
const route = useRoute();
const ticketId = ref(route.query.trip_id);
console.log(ticketId);


</script>

<style scoped>
.ticket-card {
width: 95%;
border-radius: 4px;
}

.ticket-info {
padding:40px;
background-color: #c8eaf5; 
border-radius: 10px;
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

@import "@/assets/css/card-order.css";
</style>


