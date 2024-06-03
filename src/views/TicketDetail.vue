<template>
    <div>
        <h1>火车详情</h1>
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
    
        <h2>座位选择</h2>
        <!-- 这里放置座位选择组件 -->
    
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const ticket = { //一个终将灭亡的展示用数据
        trainNumber: "G87",
        departureTime: "07:00",
        arrivalTime: "14:33",
        departure: "北京西",
        destination: "成都东",
        price: "¥200起",
        duration: "7小时33分",
        available: true,
        departureHighlight: true,
        arrivalHighlight: true,
        secondClass: "10张",
        firstClass: "10张",
        business: "10张"
};

const route = useRoute();

//const ticket = route.params.ticket;
const name = ref('');
const idNumber = ref('');
const phoneNumber = ref('');

const order = () => {
// 订购逻辑，验证信息，提交订单等
};

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


