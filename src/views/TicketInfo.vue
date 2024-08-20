<template>
    <el-page-header :icon="ArrowLeft" @back="$router.push('/main')">
        <template #content>
            <span class="head-trip-info">{{ $route.query.fromPlace }} - {{ $route.query.toPlace }}</span>
        </template>
    </el-page-header>

    <!-- <TicketCard v-for="(ticket, index) in tickets" :key="index" :ticket="ticket" /> -->
    <el-row>
        <el-col :span="12" v-for="(ticket, index) in ticketsInfo" :key="index">
        <TicketCard :ticket="ticket" />
        </el-col>
    </el-row>
</template>

<script setup>
    import { ArrowLeft } from '@element-plus/icons-vue'
    import router from "@/router";
    import TicketCard from "./TicketCard.vue";
    import timeUtil from '@/util/time';
    import {onMounted, ref} from "vue";
    import requestUtil from '@/util/request'
    import {useRoute} from "vue-router";
    const route = useRoute();
    const fromPlace = ref(route.query.fromPlace);
    const toPlace = ref(route.query.toPlace);
    const startTime = ref(route.query.startTime);
    const ticketsInfo = ref([]);
    //TODO: 交互
    onMounted(async()=> {
      console.log(fromPlace.value);
      console.log(toPlace.value);
      console.log(startTime.value);
      const res1 = await requestUtil.post('/trip/select/place/time', {
          "fromPlace": fromPlace.value,
          "toPlace": toPlace.value,
          "startTime": startTime.value
      })
      ticketsInfo.value = res1.data;
      ticketsInfo.value.forEach(item=> {
        item.start_time = timeUtil.stampToTime(item.start_time);
        item.end_time = timeUtil.stampToTime(item.end_time);
      })
      console.log(ticketsInfo.value);
    })
</script>

<style scoped>
    .head-trip-info{
        margin-left :400px;
        font-weight: bold;
        font-size: 15px;
    }
</style>

