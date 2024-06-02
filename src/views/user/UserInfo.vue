<template>
<!--  <div  class="mainCard">-->
  <el-card>
    <div class="container">
      <div class="left-div">
        <!-- 左侧内容 -->
          <div class="avatar-container">
              <div>
                <el-avatar :size="200"
                           class="avatar"
                           :src="requestUtil.getServerUrl()+userInfo.avatar"
                           @click="dialogVisible = true"></el-avatar>
                <el-dialog v-model="dialogVisible"
                           title="更换头像">
<!--                  <el-upload-->
<!--                      class="avatar-uploader"-->
<!--                      action="http://localhost:1145/user/update/avatar"-->
<!--                      :show-file-list="false"-->
<!--                      :on-change="handleChange"-->
<!--                      :on-success="handleAvatarSuccess"-->
<!--                      :before-upload="beforeAvatarUpload"-->
<!--                  >-->
<!--                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
<!--                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>-->
<!--                    <el-button>点击上传</el-button>-->
<!--                  </el-upload>-->
                  <el-upload
                      class="upload-demo"
                      action="http://localhost:1145/user/update/avatar"
                      :file-list="fileList"
                      :on-change="handleChange"
                      :http-request="customHttpRequest"
                      multiple
                      drag
                      :limit="3"
                      :on-exceed="handleExceed"
                      :auto-upload="false">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                      Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button @click="dialogVisible = false">取消更换</el-button>
<!--                      <el-button @click="window.location.reload()" type="primary">确认更换</el-button>-->
                    </div>
                  </template>
                </el-dialog>
              </div>
          </div>
      </div>
      <div class="right-div">
                <el-card class="userCard">
                  <template #header>
                    <div class="card-header">
                      <span>个人信息</span>
                    </div>
                  </template>
                  <div class="card-content">
                    <p class="card-term"><el-icon><UserFilled /></el-icon>用户名: {{ userInfo.user_name }}</p>
<!--                    <p class="card-term">昵称</p>-->
                    <p class="card-term"><el-icon><InfoFilled /></el-icon>用户类型: 用户</p>
                  </div>
                </el-card>
                <el-card class="userCard">
                  <template #header>
                    <div class="card-header">
                      <span>账号信息</span>
                    </div>
                  </template>
                  <div class="card-content">
                    <p class="card-term">用户ID:{{ userInfo.user_id }}</p>
                    <p class="card-term">创建时间</p>
                  </div>
                </el-card>
                <el-card class="userCard">
                  <template #header>
                    <div class="card-header">
                      <span>账户安全</span>
                    </div>
                  </template>
                  <div class="card-content">
                    <p class="card-term">验证邮箱</p>
                  </div>
                </el-card>
      </div>
    </div>
  </el-card>
</template>
<script setup>
  import requestUtil from "@/util/request"
  import {onMounted, ref} from "vue";
  import cookieUtil from "@/util/cookie"
  import requestUtils from "@/util/request";
  import {ElMessage} from "element-plus";
  const userInfo = ref([]);
  const dialogVisible = ref(false);
  const imageUrl = ref('');
  const type = ref('')
  var version = Math.random();
  const handleAvatarSuccess = function (response, uploadFile) {
    imageUrl.value = URL.createObjectURL(uploadFile.raw);
    console.log(imageUrl.value);
  };
  const handleChange = async(file, fileList) => {
    if (file.raw) {
      const formData = new FormData();
      formData.append('avatar', file.raw);
      formData.append('userId', cookieUtil.getCookie("userId"));
      try {
        const results = await requestUtils.fileUpload('user/update/avatar', formData);
        imageUrl.value = results.data.imageUrl; // 更新imageUrl为上传成功后的图片URL
        console.log(imageUrl);
        ElMessage({
          message: "上传成功！",
          type: "success"
        });
        setTimeout(function() {
          location.reload();
        }, 500); // 1000毫秒等于1秒
      }catch (e) {
        ElMessage({
          message: "上传失败！",
          type: "warning"
        });
      }


    }
  };
  onMounted(async()=> {
    try {
      const res = await requestUtil.get('/user/select/userId', {
        "userId": cookieUtil.getCookie("userId")
      })
      userInfo.value = res.data;
      console.log(res);
      console.log(userInfo);
      console.log(requestUtil.getServerUrl()+userInfo.value.avatar);
    }catch (e){
      console.error(e);
    }
    // console.log(userInfo);
  })
  //更新后，不仅要更新数据，还要更新cookie
</script>
<style>
.container {
  display: flex;
}

.left-div {
  width: 40%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.right-div {
  width: 60%;
}
.userCard {
  max-width: 90%;
  margin-bottom: 1.5%;
  margin-left: 5%;
}

.card-header {
  font-size: 25px;
}

.card-content {
  margin-left: 3%;
}

.card-term {
  font-size: 20px;
  margin-top: 1%;
  margin-bottom: 1.5%;
}
.avatar {

}
.avatar-container {
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
