<template>
  <el-card style="width: 70%;">
    <el-page-header @click="$router.push('/main')">
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
      <div class="component">
        <hr style="color: #6b778c">
      </div>
      <div class="component">
        <span style="margin-right: 2%">请输入姓名：<span style="color: red">*</span></span>
        <el-input v-model="newName" placeholder="请输入名字" style="width: 65%;"/>
      </div>
      <div class="component">
        <span style="margin-right: 2%">请输入手机号：<span style="color: red">*</span></span>
        <el-input v-model="newPhone" placeholder="请输入手机号" style="width: 63%;"/>
      </div>
      <div class="component">
        <span style="margin-right: 2%">请输入身份证号：<span style="color: red">*</span></span>
        <el-input v-model="newIdentity" placeholder="请输入身份证号" style="width: 61%;"/>
      </div>
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
import {ElMessage} from "element-plus";
const passengers = ref([]);
const addVisible = ref(false);
const newName = ref("");
const newPhone = ref("");
const newIdentity = ref("");
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
const addPassenger = async() => {
  try {
    const res = await requestUtil.post("/passenger/create", {
      "phoneNum": newPhone.value,
      "userId": cookieUtil.getCookie("userId"),
      "identity": newIdentity.value,
      "name": newName.value
    })
    console.log(res.data);
    if(res.data.msg == "create passenger success") {
      ElMessage({
        message: "创建成功！",
        type: "success"
      })
    } else if(res.data.msg == "passenger already exists") {
      ElMessage({
        message: "该用户已存在！",
        type: "warning"
      })
    }
    setTimeout(function() {
      location.reload();
    },500);
  }catch (e) {
    ElMessage({
      message: "创建失败",
      type: "error"
    })
  }

}
</script>

<style scoped>

</style>