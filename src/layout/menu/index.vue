<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo full-height"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      router="true"
      :collapse="isCollapse"
  >
    <el-menu-item @click="collapseItem">
        <el-icon>
          <Operation/>
        </el-icon>
      <span>菜单</span>
    </el-menu-item>
    <el-menu-item index="/main" @click="updateUnreadMessagesNumber">
        <el-icon>
          <House/>
        </el-icon>
        <span>主页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><User/></el-icon>
        <span>用户中心</span>
      </template>
      <el-menu-item index="/userinfo">用户信息</el-menu-item>
      <el-menu-item index="/user/foodorders">用户订单</el-menu-item>
      <el-menu-item index="/user/passengers">乘车人信息</el-menu-item>
    </el-sub-menu>
<!--    <el-sub-menu index="2">-->
<!--      <template #title>-->
<!--        <el-icon><location /></el-icon>-->
<!--        <span>车次/订单管理</span>-->
<!--      </template>-->
<!--        <el-menu-item index="/manage/trips" >创建车次</el-menu-item>-->
<!--        <el-menu-item index="/manage/orders" >创建订单</el-menu-item>-->
<!--    </el-sub-menu>-->
    <el-menu-item index="/message">
      <el-icon>
        <ChatDotSquare />
      </el-icon>
      <span v-if="unreadMessageNumber === 0">消息中心</span>
      <span v-else>消息中心({{unreadMessageNumber}}条未读）</span>
    </el-menu-item>

  </el-menu>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const isCollapse = ref(true)
let unreadMessageNumber = ref()
import messageUtil from '@/util/message'
import cookieUtil from "@/util/cookie"
function collapseItem() {
  if (isCollapse.value == true) isCollapse.value = false;
  else isCollapse.value = true;
  updateUnreadMessagesNumber();
}
async function updateUnreadMessagesNumber (){
  unreadMessageNumber = await messageUtil.getUnreadMessageNumber(cookieUtil.getCookie("userId"))
}
onMounted(async () => {
  await updateUnreadMessagesNumber()
  // console.log("unreadMessageNumber = "+unreadMessageNumber)
})
</script>

<style lang="scss" scoped>
.full-height {
  height: 100%;
}

</style>
