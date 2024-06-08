<template>
  <el-card style="width: 100%">
    <div style="display: flex">
      <div style="width: 80%">
        <div class="component">
          <el-row>
            <el-col :span="4">
              <span style="font-size: larger; color: #12a72b">{{ passenger.name }}</span>
            </el-col>
            <!--            <div style="border-radius: 5px; border: 1px solid #6b778c; color: #6b778c">学生</div>-->
          </el-row>
        </div>
        <div class="component">
          <hr style="color: #6b778c">
        </div>
        <div class="component">
          <el-row>
            <span>手机号: {{ passenger.phone_number }}</span>
          </el-row>
        </div>
        <div class="component">
          <el-row>
            <span>身份证号: {{ maskedIdentity }}</span>
          </el-row>
        </div>
      </div>
      <div style="width: 20%; display: flex; justify-content: center; align-items: center;">
        <div @click="passenger.dialogVisible = true">
          <el-icon size="40px" color="gray"><EditPen /></el-icon>
        </div>
      </div>
    </div>
  </el-card>
  <el-dialog v-model="passenger.dialogVisible" title="修改乘车人信息">
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
      <el-button @click="passenger.dialogVisible =false" type="default">返回</el-button>
      <el-button @click="handleModify" type="primary">修改信息</el-button>
    </template>
  </el-dialog>
</template>
<script>
import requestUtil from "@/util/request";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";
export default {
  props: {
    passenger: Object
  },
  setup(props) {
    const newName = ref("");
    const newIdentity = ref("");
    const newPhone = ref("");
    const handleModify = async() => {
      if(newName.value === "") {
        ElMessage({
          message: "请输入姓名！",
          type: "warning"
        });
        return;
      }
      if(newIdentity.value === "") {
        ElMessage({
          message: "请输入身份证号！",
          type: "warning"
        });
        return;
      }
      if(newPhone.value === "") {
        ElMessage({
          message: "请输入电话号！",
          type: "warning"
        });
        return;
      }
      try {
        const res = await requestUtil.post('/passenger/modify', {
          "pid": props.passenger.pid,
          "name": newName.value,
          "identity": newIdentity.value,
          "phoneNum": newPhone.value,
        })
        if(res.data.code == "200") {
          ElMessage({
            message: "修改成功！",
            type: "success"
          })
          setTimeout(function() {
            location.reload();
          }, 500);
        }else{
         if(res.data.msg === "illegal identity"){
           ElMessage({
             message: "请输入正确的身份证号",
             type: "warning"
           });
         }
         if(res.data.msg === "illegal phone") {
           ElMessage({
             message: "请输入正确的的手机号",
             type: "warning"
           });
         }
        }
      }catch (e) {
        ElMessage({
          message: "修改失败",
          type: "error"
        })
      }
    }

    // 计算身份证号码的掩码形式
    const maskedIdentity = computed(() => {
      // 将身份证号码转换为字符串
      const identity = props.passenger.identity.toString();
      // 获取身份证号码的长度
      const length = identity.length;
      // 如果身份证号码长度小于3，则返回原始身份证号码
      if (length < 3) return identity;
      // 获取需要替换为"*"的长度（身份证号码中间部分）
      const replaceLength = length - 7;
      // 构建掩码字符串
      const maskedString = "*".repeat(replaceLength);
      // 将身份证号码的中间部分替换为掩码字符串
      return identity.substring(0, 3) + maskedString + identity.substring(length - 4);
    });

    return {
      maskedIdentity,
      handleModify,
      newName,
      newPhone,
      newIdentity
    };
  }
}
</script>
<style scoped>
@import "@/assets/css/basic.css";
</style>