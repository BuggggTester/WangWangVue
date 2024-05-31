<script setup>
import {nextTick, onMounted, ref} from "vue"
import requestUtil from "@/util/request"
import cookieUtil from "@/util/cookie"
import messageUtil from "@/util/message"
import index from "vuex";
let messages = ref([])

const onlyunread = ref(false)
const pick_date = ref('')
const size = ref('default')
const count = ref(0)
let unreadmessages = ref([])
const load = () => {
  count.value += 10
}
const setRead = async (message_id) => {
  console.log("set")
  await requestUtil.put('/message/setread', {
    message_id: message_id
  })
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
  // console.log(messages.value)
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
}
const createTest = async () => {
  await messageUtil.createMessage("Crow_D", 1, "推送测试", "test")
}
onMounted( async () => {
  await getAllMessages()
})

</script>

<template>
  <el-container>
    <el-header class="header" style="margin-left: 2.5%">消息中心</el-header>
    <el-row justify="space-between">
      <el-col :span="7"><el-button style="font-family: 'Microsoft Yahei'" @click="setAllRead">全部设为已读</el-button></el-col>
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
    <ul v-infinite-scroll="load" style="overflow: auto">
      <el-row justify="space-around">
        <el-col :span="6"><p>标题</p></el-col>
        <el-col :span="3"><p>日期</p></el-col>
        <el-col :span="4"><p>发送者</p></el-col>
        <el-col :span="2"><p>状态</p></el-col>
      </el-row>
    </ul>
    <el-divider style="margin: 6px"/>
    <ul v-infinite-scroll="load" style="overflow: auto">
      <li v-for="message in messages" class="infinite-list-item">
        <div v-if="message.ifread === false" class="message-row-unread">
          <el-row justify="space-around" class="message-row">
            <el-popover v-bind="{content: message.body}" trigger="click" >
              <template #reference>
                <el-col :span="6" @click="setRead(message.message_id)"><p>{{message.title}}</p></el-col>
              </template>
            </el-popover>
            <el-col :span="3"><p>{{message.send_date}}</p></el-col>
            <el-col :span="4"><p>{{message.send}}</p></el-col>
            <el-col :span="2" v-if="message.ifread === false"><p>未读</p></el-col>
          </el-row>
        </div>

        <div v-else class="message-row-read">
          <el-row justify="space-around" class="message-row">
            <el-popover v-bind="{content: message.body}" trigger="click">
              <template #reference>
                <el-col :span="6" @click="setRead(message.message_id)"><p>{{message.title}}</p></el-col>
              </template>

            </el-popover>
            <el-col :span="3"><p>{{message.send_date}}</p></el-col>
            <el-col :span="4"><p>{{message.send}}</p></el-col>
            <el-col :span="2" v-if="message.ifread === true"><p>已读</p></el-col>
          </el-row>
        </div>
        <el-divider class="divider"/>
      </li>
    </ul>
<!--    <el-button @click="createTest">press to create a message</el-button>-->
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
  justify-content: center;
  height: 50px;
  margin: 10px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.message-row{
  margin-top: 6px;
}
.message-row-unread {
  background-color: rgba(137, 193, 246, 0.44);
  border-radius:50px;
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
  margin-top: 0px;
  margin-bottom: 5px;
  border-bottom: 1px;
}
</style>