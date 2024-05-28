<script setup>
import {onMounted, ref} from "vue"
import requestUtil from "@/util/request"
import cookieUtil from "@/util/cookie"
import index from "vuex";
let messages = ref([])
const setAllRead = () =>{}
const getMessages = async() => {
  messages = await requestUtil.get('message/baseselect',{
    receive: cookieUtil.getCookie("userId")
  })
  console.log(messages.data)
}
const default_value = ref(false)
const pick_date = ref('')
const size = ref('default')
const count = ref(0)
const load = () => {
  count.value += 10
}
onMounted(() => {
  messages = getMessages();
})
</script>

<template>
  <el-container>
    <el-header class="header" style="margin-left: 2.5%">消息中心</el-header>
    <el-row justify="space-around">
      <el-col :span="10"><el-button style="font-family: 'Microsoft Yahei'" @click="setAllRead">全部设为已读</el-button></el-col>
      <el-col :span="3"><el-checkbox v-model="default_value">只看未读消息</el-checkbox></el-col>
      <el-col :span="5">
        <div>
        <el-date-picker
          v-model="pick_date"
          type="date"
          placeholder="选择消息接收截止日期"
        />
        </div>
      </el-col>
    </el-row>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li v-for="message in messages" :key="index"></li>
    </ul>
  </el-container>
</template>

<style scoped>
.header{
  font-family: "Microsoft Yahei" !important;
  font-size: 30px;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
</style>