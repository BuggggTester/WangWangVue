<template>
<!--  <div>-->
<!--    // 这里是提交的表单数据-->
<!--    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">-->

<!--    </el-form>-->
<!--    // 头像上传-->
<!--    <el-form-item label="头像" prop="chairImg">-->
<!--      <el-upload-->
<!--          class="avatar-uploader"-->
<!--          action="http://localhost:9999/chairman/uploadimg"-->
<!--          :show-file-list="false"-->
<!--          multiple-->
<!--          :limit="1"-->
<!--          :on-success="handleAvatarSuccess"-->
<!--          :before-upload="beforeAvatarUpload">-->
<!--        &lt;!&ndash; 构建虚拟路径 &ndash;&gt;-->
<!--        <img v-if="editForm.chairImg" :src=" 'http://localhost:1145/api/file/' + editForm.chairImg" class="avatar">-->
<!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--      </el-upload>-->
<!--    </el-form-item>-->
<!--  </div>-->
  <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
      :size="size"
  />
  <el-button @click="console.log(value1)">输出</el-button>
</template>
<script setup>
import {ref} from "vue";
import time from "@/util/time";

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

const disabledDate = (tim) => {
  return time.getTime() > Date.now()
}
// export default {
//   data() {
//     return {
//       editForm: {}, // 初始化表单数据对象
//       editFormRules: {} // 表单验证规则，如果有的话
//     };
//   },
//   methods: {
//     handleAvatarSuccess(res) {
//       // 把图片名给img
//       this.editForm.chairImg = res;
//     },
//     beforeAvatarUpload(file) {
//       // 设置限定格式
//       const img_mimetype = ['image/jpeg', 'image/jpg', 'image/png']
//       const isJPG = img_mimetype.includes(file.type);
//       const isLt2M = file.size / 1024 / 1024 < 2;
//       if (!isJPG) {
//         this.$message.error('上传头像只能是图片格式!');
//         return false;
//       }
//       if (!isLt2M) {
//         this.$message.error('上传头像图片大小不能超过 2MB!');
//         return false;
//       }
//       return isJPG && isLt2M;
//     },
//     // 提交修改的表单数据
//     async editChairmans() {
//       const {data: rese} = await this.$http.post('/chairman/editChairmans', this.editForm);
//     }
//
//   }
// }
</script>