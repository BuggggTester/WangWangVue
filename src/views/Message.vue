<script setup>
import {nextTick, onMounted, ref} from "vue"
import requestUtil from "@/util/request"
import cookieUtil from "@/util/cookie"
import messageUtil from "@/util/message"
import index from "vuex";
let messages = ref([])

const onlyunread = ref(false)
let dialogVisible = ref([])
const pick_date = ref('')
const size = ref('default')
const count = ref(0)
let unreadmessages = ref([])
const load = () => {
  count.value += 10
}
const setRead = async (message) => {
  console.log("set")

  await requestUtil.put('/message/setread', {
    message_id: message.message_id
  })
  let i = messages.value.indexOf(message)
  messages.value[i].ifread = true
}
const resetDialogState = (messages) => {
  dialogVisible = ref([])
  let number = messages.value.length
  for(let i = 0; i < number; i ++){
    dialogVisible.value.push(false)
  }
}
const setAllRead = async () =>{
  const rec = await requestUtil.get('message/unreadselect', {
    receive: cookieUtil.getCookie("userId")
  })
  unreadmessages.value = rec.data;
  const num = unreadmessages.value.length
  for(var i = 0; i < num; i ++){
    // console.log(unreadmessages.value[i]);
    await requestUtil.put('/message/setread', {
      message_id: unreadmessages.value[i].message_id
    })
  }
  await getAllMessages()
}
const getAllMessages = async () => {
  const rec = await requestUtil.get('message/baseselect',{
    receive: cookieUtil.getCookie("userId")
  })
  messages.value = rec.data
  console.log(messages.value)
}
const getUnreadMessages = async () => {
  const rec = await requestUtil.get('message/unreadselect',{
    receive: cookieUtil.getCookie("userId")
  })
  messages.value = rec.data
}
const getMessagesByDate = async () => {
  const rec = await requestUtil.get('message/dateselect', {
    receive: cookieUtil.getCookie("userId"),
    send_date: pick_date.value
  })
  messages.value = rec.data
}
const getUnreadMessagesByDate = async () => {
  const rec = await requestUtil.get('message/unreaddateselect', {
    receive: cookieUtil.getCookie("userId"),
    send_date: pick_date.value
  })
  messages.value = rec.data
}
const catchChange = async () => {
  console.log(pick_date.value)
  console.log(onlyunread.value)
  if(pick_date.value === "" || pick_date.value == null){
    if(!onlyunread.value){
      await getAllMessages()
    }else{
      await getUnreadMessages()
    }
  }else{
    if(!onlyunread.value){
      await getMessagesByDate()
    }else{
      await getUnreadMessagesByDate()
    }
  }
  resetDialogState(messages)
}
const createTest = async () => {
  await messageUtil.createMessage("Crow_D", cookieUtil.getCookie("userId"), "推送测试", "test")
}
onMounted( async () => {
  await getAllMessages()
})
</script>

<template>
  <el-card style="padding-left: 5%; padding-right: 5%">
    <template #header>
    <el-page-header  @back="goBack">
      <template #content>
        <span style="font-size: larger; font-weight: 600; margin-right: 3%; white-space: nowrap;">消息中心</span>
      </template>
    </el-page-header>
    </template>
    <el-row justify="space-between">
      <el-col :span="3"><el-button style="font-family: 'Microsoft Yahei'" @click="setAllRead">全部设为已读</el-button></el-col>
      <el-col :span="3"><el-checkbox v-model="onlyunread" @change="catchChange">只看未读消息</el-checkbox></el-col>
      <el-col :span="7">
        <div>
        <el-date-picker
          v-model="pick_date"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="选择消息接收截止日期"
          @change="catchChange"
        />
        </div>
      </el-col>
    </el-row>
    <el-divider border-style="hidden" style="margin: 10px"/>
      <el-row justify="space-around">
        <el-col :span="6"><p>标题</p></el-col>
        <el-col :span="4"><p>日期</p></el-col>
        <el-col :span="3"><p>发送者</p></el-col>
        <el-col :span="2"><p>状态</p></el-col>
      </el-row>
    <el-divider style="margin: 5px"/>
    <ul v-infinite-scroll="load" style="overflow: auto">
      <li v-for="message in messages" class="infinite-list-item">
        <div :class="[message.ifread ? 'message-row-read' : 'message-row-unread']" @click="dialogVisible[messages.indexOf(message)] = true; setRead(message)">
          <el-row justify="space-around" class="message-row">
            <el-col :span="6">
              <p>
                {{ message.title }}
              </p>
              <el-dialog
                  v-model="dialogVisible[messages.indexOf(message)]"
                  :title="message.title"
                  width="500"
              >
                <div class="mainbody">{{ message.body }}</div>
                <div class="foot">发送时间：{{message.send_date}} {{ message.send_time }}</div>
              </el-dialog>
            </el-col>
            <el-col :span="5"><p>&emsp;&emsp;{{message.send_date}}</p></el-col>
            <el-col :span="4"><p>&emsp;&emsp;{{message.send}}</p></el-col>
            <el-col :span="2" v-if="message.ifread === true"><p>已读</p></el-col>
            <el-col :span="2" v-else><p>未读</p></el-col>
          </el-row>
        </div>
        <el-divider class="divider"/>
      </li>
    </ul>
    <el-button @click="createTest">press to create a message</el-button>
  </el-card>
</template>

<style scoped>
.header{
  font-family: "Microsoft Yahei" !important;
  font-size: 30px;
}
.infinite-list {
  height: 54px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  justify-content: center;
  height: 50px;
  margin: 10px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.message-row{
  margin-top: 3px;
  margin-bottom: 6px;
}
.message-row-unread {
  background-color: rgba(137, 193, 246, 0.44);
  border-radius:10px;
  margin-top: 5px;
  height: 30px !important;
  overflow:hidden !important;
  align-items: center;
}
.message-row-read {
  border-radius:50px;
  margin-top: 5px;
  height: 30px !important;
  overflow:hidden !important
}
.divider{
  margin-top: 5px;
  margin-bottom: 0px;
  border-bottom: 10px;
}
.mainbody{
  font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  width: 100%;
}
.foot{
  color: #8c939d;
  width: 100%;
  margin-top: 20px;
}
p{
  margin-top: 6px
}
button{
  margin-top: 0px;
}
</style>