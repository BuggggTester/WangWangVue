<template>
    <el-page-header :icon="ArrowLeft" @back="$router.push('/main')">
        <template #content>
            <span class="head-trip-info">{{ $route.query.fromPlace }} - {{ $route.query.toPlace }}</span>
        </template>
    </el-page-header>

    <!-- <TicketCard v-for="(ticket, index) in tickets" :key="index" :ticket="ticket" /> -->
    <el-row>
        <el-col :span="12" v-for="(ticket, index) in tickets" :key="index">
        <TicketCard :ticket="ticket" />
        </el-col>
    </el-row>
</template>

<script setup>
    import { ArrowLeft } from '@element-plus/icons-vue'
    import router from "@/router";
    import TicketCard from "./TicketCard.vue";

    const tickets = [ // 示例数据
    {
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
    },
    {
        trainNumber: "G483",
        departureTime: "08:00",
        arrivalTime: "15:30",
        departure: "上海",
        destination: "广州",
        price: "¥250起",
        duration: "7小时30分",
        available: false,
        departureHighlight: true,
        arrivalHighlight: true,
        secondClass: "5张",
        firstClass: "0张",
        business: "0张"
    },
    {
        trainNumber: "D123",
        departureTime: "08:00",
        arrivalTime: "15:30",
        departure: "上海",
        destination: "广州",
        price: "¥250起",
        duration: "7小时30分",
        available: false,
        departureHighlight: true,
        arrivalHighlight: true,
        secondClass: "5张",
        firstClass: "0张",
        business: "0张"
    },
    {
        trainNumber: "D123",
        departureTime: "08:00",
        arrivalTime: "15:30",
        departure: "学院路",
        destination: "沙河",
        price: "¥10起",
        duration: "7小时30分",
        available: false,
        departureHighlight: true,
        arrivalHighlight: true,
        secondClass: "5张",
        firstClass: "0张",
        business: "0张"
    },
    {
        trainNumber: "D123",
        departureTime: "08:00",
        arrivalTime: "15:30",
        departure: "沙河",
        destination: "学院路",
        price: "¥10起",
        duration: "7小时30分",
        available: false,
        departureHighlight: true,
        arrivalHighlight: true,
        secondClass: "5张",
        firstClass: "0张",
        business: "0张"
    },
    {
        trainNumber: "D123",
        departureTime: "08:00",
        arrivalTime: "15:30",
        departure: "上海",
        destination: "广州",
        price: "¥250起",
        duration: "7小时30分",
        available: false,
        departureHighlight: true,
        arrivalHighlight: true,
        secondClass: "5张",
        firstClass: "0张",
        business: "0张"
    },
    ];

</script>

<style scoped>
    .head-trip-info{
        margin-left :400px;
        font-weight: bold;
        font-size: 15px;
    }
</style>

