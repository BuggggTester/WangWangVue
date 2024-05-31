<script setup>
import {nextTick, onMounted, ref} from "vue"
import requestUtil from "@/util/request"
import cookieUtil from "@/util/cookie"
import index from "vuex";
let messages = ref([])

const default_value = ref(false)
const pick_date = ref('')
const size = ref('default')
const count = ref(0)
let unreadmessages = ref([])
const load = () => {
  count.value += 10
}
const setAllRead = async () =>{
  const rec = await requestUtil.get('/message/unreadselect', {
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
const getddl = () =>{
  console.log(pick_date.value+"has been set")
}
const getAllMessages = async () => {
  const rec = await requestUtil.get('message/baseselect',{
    receive: cookieUtil.getCookie("userId")
  })
  messages.value = rec.data
  // console.log(messages.value)
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
      <el-col :span="3"><el-checkbox v-model="default_value">只看未读消息</el-checkbox></el-col>
      <el-col :span="7">
        <div>
        <el-date-picker
          v-model="pick_date"
          type="date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          placeholder="选择消息接收截止日期"
          @change="getddl"
        />
        </div>
      </el-col>
    </el-row>
    <el-divider border-style="hidden" style="margin: 10px"/>
      <el-row justify="space-around">
        <el-col :span="6"><p>标题</p></el-col>
        <el-col :span="3"><p>日期</p></el-col>
        <el-col :span="4"><p>发送者</p></el-col>
        <el-col :span="2"><p>状态</p></el-col>
      </el-row>
    <el-divider style="margin: 6px"/>
    <ul v-infinite-scroll="load" style="overflow: auto">
      <li v-for="message in messages" class="infinite-list-item">
        <div v-if="message.ifread === false" class="message-row-unread">
          <el-row justify="space-around" class="message-row">
            <el-popover v-bind="{content: message.body}" trigger="click">
              <template #reference>
                <el-col :span="6"><p>{{message.title}}</p></el-col>
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
                <el-col :span="6"><p>{{message.title}}</p></el-col>
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