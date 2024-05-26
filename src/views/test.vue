<template>
  <el-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      multiple
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <el-button @click="submit">提交</el-button>
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const submit = () => {

};

const fileList = ref();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

</script>
