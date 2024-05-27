<template>
  <el-upload
      class="upload-demo"
      action="http://localhost:1145/file/upload"
      :file-list="fileList"
      :on-change="handleChange"
      :http-request="customHttpRequest"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <img :src="imageUrl">
</template>

<script setup>
import requestUtils, {getServerUrl} from "@/util/request";
import { ElMessage } from "element-plus";
import { ref } from "vue";
    // const imageUrl = ref("http://localhost:1145/images/avatars/b2d139e3-27b7-47c0-9102-1e917814f310.png");
    const imageUrl = getServerUrl()+"images/user.png";
    console.log(imageUrl);
    const fileList = ref([]);

    const handleChange = (file, fileList) => {
      if (file.raw) {
        const formData = new FormData();
        formData.append('File', file.raw);

        requestUtils.fileUpload('file/upload', formData)
            .then(response => {
              imageUrl.value = response.data.imageUrl; // 更新imageUrl为上传成功后的图片URL
              ElMessage({
                message: "上传成功！",
                type: "success"
              });
            })
            .catch(error => {
              ElMessage({
                message: "上传失败！",
                type: "warning"
              });
            });

    };

    const customHttpRequest = (file) => {
      // 自定义上传逻辑，如果需要可以在这里进行处理
    };

    const handleExceed = (files, fileList) => {
      ElMessage.warning('最多只能上传 3 张图片');
    };
}
</script>