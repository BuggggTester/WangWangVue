<template>
  <el-card style="width: 70%;">
    <el-page-header>
      <template #content>
        <span class="text-large font-600 mr-3"> 乘车人信息 </span>
      </template>
      <div class="mt-4 text-sm font-bold">
      </div>
    </el-page-header>
    <div v-if="passengers.length > 0" v-for="passenger in passengers" :key="passenger.pid" style="margin-top: 3%">
      <IdentityCard :passenger="passenger"/>
    </div>
    <div v-else>
      <NoIdentity/>
    </div>
    <div class="component">
      <el-button style="width: 100%;" @click="addVisible = true"> + 点击添加乘车人</el-button>
    </div>
    <el-dialog v-model="addVisible">
      <template #footer>
        <el-button type="default" @click="addVisible = false">返回</el-button>
        <el-button type="primary" @click="addPassenger">添加乘车人</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
<script setup>
import {onMounted, ref} from "vue";
import requestUtil from "@/util/request"
import cookieUtil from "@/util/cookie"
import IdentityCard from "@/views/IdentityCard.vue";
const passengers = ref([]);
const addVisible = ref(false);
onMounted(async () => {
  console.log(cookieUtil.getCookie("userId"));
  const res = await requestUtil.get('/passenger/select/userId', {
    "userId": cookieUtil.getCookie("userId")
  })
  passengers.value = res.data;
  passengers.value.forEach(item=> {
    item.dialogVisible = false;
  })
  console.log(passengers.value);
})
</script>

<style scoped>

</style>