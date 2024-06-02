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
                      拖拽图片上传或 <em>点击这里上传</em>
                    </div>
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
                    <p class="card-term"><el-icon style=""><User /></el-icon>用户名: {{ userInfo.user_name }}</p>
<!--                    <p class="card-term">昵称</p>-->
                    <p class="card-term"><el-icon><InfoFilled /></el-icon>用户类型: 用户</p>
                    <p v-if="userInfo.email !== null" class="card-term"><el-icon><Message /></el-icon>邮箱：{{ userInfo.email }} <a style="cursor: pointer;margin-left: 5%" @click="setEmail">重新绑定邮箱</a></p>
                    <p v-else class="card-term"><el-icon><Message /></el-icon>邮箱：暂无 <a style="cursor: pointer;margin-left: 5%" @click="setEmail">点此设置邮箱</a></p>
                    <p class="card-term"><el-icon><Lock /></el-icon>密码：{{ password }}
                      <div v-if="pwdVisible === false" style="margin-left: 5%">
                        <el-icon @click="pwdShowed"><Hide/></el-icon>
                      </div>
                      <div v-if="pwdVisible === true" style="margin-left: 5%">
                        <el-icon @click="pwdHide"><View/></el-icon>
                      </div>
                    </p>
                    <el-dialog v-model="setEmailDialogVisible"
                               title="设置邮箱"
                               width="500"
                               align-center>
                      <div class="component">
                        <el-input v-model="inputEmail" placeholder="请输入邮箱" style="width: 73%;"/>
                      </div>
                      <div class="component">
                        <el-input v-model="emailValid" placeholder="请输入验证码" style="width: 40%"></el-input>
                        <el-button style="margin-left: 5%" :disabled="disabled" @click="getValid">{{ btnText }}</el-button>
                      </div>
                      <template #footer>
                        <el-button type="default" @click="setEmailDialogVisible = false">点击返回</el-button>
                        <el-button type="primary" @click="handleSetEmail">绑定邮箱</el-button>
                      </template>
                    </el-dialog>
                  </div>
                </el-card>
                <el-card class="userCard">
                  <template #header>
                    <div class="card-header">
                      <span>账号管理</span>
                    </div>
                  </template>
                  <div class="card-content">
                    <p class="card-term" style="color: red; cursor: pointer" @click="modifyPwdVisible = true" >修改密码</p>
                    <p class="card-term" style="color: red; cursor: pointer" @click="logoutVisible = true" >退出登录</p>
                    <el-dialog title="退出登录"
                               v-model="logoutVisible">
                      您确定要退出登录吗？
                      <template #footer>
                        <el-button type="primary" @click="logoutVisible = false">返回</el-button>
                        <el-button type="default" @click="handleLogout">退出登录</el-button>
                      </template>
                    </el-dialog>
                    <el-dialog title="修改密码"
                               v-model="modifyPwdVisible" width="500">
                      <div class="component">
                        <el-input placeholder="请输入邮箱" v-model="modifyEmail" style="width: 73%;"/>
                      </div>
                      <div class="component">
                      <el-input v-model="newValid"placeholder="请输入验证码" style="width: 40%"></el-input>
                      <el-button style="margin-left: 5%" :disabled="disabled" @click="getValid">{{ btnText }}</el-button>
                      </div>
                      <div class="component">
                        <el-input placeholder="请输入新密码" v-model="newPwd" style="width: 73%"/>
                      </div>
                      <div class="component">
                        <el-input placeholder="请再次输入新密码" v-model="repeatNewPwd" style="width: 73%"/>
                      </div>
                      <template #footer>
                        <el-button type="primary" @click="modifyPwdVisible = false">返回</el-button>
                        <el-button type="default" @click="handleModifyPwd">确认修改</el-button>
                      </template>
                    </el-dialog>
                  </div>
                </el-card>
<!--                <el-card class="userCard">-->
<!--                  <template #header>-->
<!--                    <div class="card-header">-->
<!--                      <span>账户安全</span>-->
<!--                    </div>-->
<!--                  </template>-->
<!--                  <div class="card-content">-->
<!--                    <p class="card-term">验证邮箱</p>-->
<!--                  </div>-->
<!--                </el-card>-->
      </div>
    </div>
  </el-card>
</template>
<script setup>
  import requestUtil from "@/util/request"
  import {onMounted, ref} from "vue";
  import cookieUtil from "@/util/cookie"
  import {ElMessage} from "element-plus";
  import router from "@/router";
  const userInfo = ref([]);
  const dialogVisible = ref(false);
  const imageUrl = ref('');
  const inputEmail = ref('');
  const emailValid = ref('');
  const disabled = ref(false);
  const type = ref('');
  const btnText = ref("获取验证码");
  const pwdVisible = ref(false);
  const setEmailDialogVisible = ref(false);
  const logoutVisible = ref(false);
  const modifyPwdVisible = ref(false);
  const modifyEmail = ref('');
  const newPwd = ref('');
  const repeatNewPwd = ref('');
  const newValid = ref('');
  var version = Math.random();
  const password = ref('*'.repeat(cookieUtil.getCookie("password").length));
  const handleLogout = () => {
    try{
      const rememberMe = cookieUtil.getCookie("rememberMe");
      if(!rememberMe) {
        //如果登录选择不记住密码，则清除cookie
        cookieUtil.deleteCookie("userName");
        cookieUtil.deleteCookie("userId");
        cookieUtil.deleteCookie("password");
        cookieUtil.deleteCookie("avatar");
      }
      cookieUtil.setCookie("ifLogin", false, 3600);
      logoutVisible.value = false;
      ElMessage({
        message: "退出成功！",
        type: "success"
      })
      setTimeout(()=>{
        router.push('/login')
      },500);
    }catch (e) {
      console.error(e);
      ElMessage({
        message: "退出失败",
        type: "warning"
      })
    }
  }
  const handleModifyPwd = async() => {
    //TODO:验证输入合理性
    if(newPwd.value === ''){
      ElMessage({
        type: "warning",
        message: "请输入新密码！"
      })
    }
    if(repeatNewPwd.value === ''){
      ElMessage({
        type: "warning",
        message: "请再次输入新密码！"
      })
    }
    if(newValid.value === ''){
      ElMessage({
        type: "warning",
        message: "请输入验证码！"
      })
    }
    if(newPwd.value !== repeatNewPwd.value) {
      ElMessage({
        type: "warning",
        message: "两次密码不一致！"
      })
    }
    //TODO:调用接口
    try {
      const res = await requestUtil.get('/user/modify/password', {
        "userId": cookieUtil.getCookie("userId"),
        "password": newPwd.value
      })
      console.log(res);
      ElMessage({
        message: "密码更新成功！",
        type: "success"
      })
      setTimeout(function(){
        location.reload();
      },500);
    }catch (e) {
      console.log(e);
    }
    //TODO:接受返回信息并输出到页面
  }
  const pwdShowed = () => {
    pwdVisible.value = true;
    password.value = userInfo.value.password;
  }
  const pwdHide = () => {
    pwdVisible.value = false;
    const hiddenPassword = '*'.repeat(password.value.length); // 创建与密码相同长度的星号字符串
    password.value = hiddenPassword;
  }
  const setEmail = () => {
    setEmailDialogVisible.value = true;
  }
  const getValid = () => {
    alert("您的验证码是：1234");
    disabled.value = true;
    let countDown = 60; // 设置倒计时时间，单位为秒

    const timer = setInterval(() => {
      countDown--;

      if (countDown === 0) {
        clearInterval(timer);
        // 倒计时结束，启用按钮并重置文字
        disabled.value = false;
        btnText.value = '获取验证码';
      } else {
        // 更新按钮文字，显示倒计时
        btnText.value = `${countDown}秒后重新获取`;
        // console.log(countDown);
      }
    }, 1000); // 每隔一秒更新倒计时
  }
  const handleSetEmail = async () => {
    try {
      console.log(cookieUtil.getCookie("userId"));
      console.log(cookieUtil.getCookie("password"));
      console.log(inputEmail.value);
      const res = await requestUtil.post('/user/set/email', {
        "userId": cookieUtil.getCookie("userId"),
        "password": cookieUtil.getCookie("password"),
        "userName": cookieUtil.getCookie("userName"),
        "email": inputEmail.value
      })
      console.log(res);
      if(res.data.msg === "same email"){
        ElMessage({
          message: "请输入与之前不同的邮箱！",
          type: "warning"
        })
        return;
      }
      else if(res.data.msg === "validate identity failed") {
        ElMessage({
          message: "身份验证失效；请重新登陆",
          type: "warning"
        })
        return;
      }
      else if(res.data.msg === "set email success!") {
        ElMessage({
          type: "success",
          message: "绑定成功！"
        });
        setTimeout(function (){
          location.reload();
        },500);
      }else{
        console.log(res);
        return;
      }

      console.log(res);
    }catch (e) {
      console.error(e);
      ElMessage({
        type: "warning",
        message: "绑定失败！"
      })
    }
  }
  const handleChange = async(file, fileList) => {
    if (file.raw) {
      const formData = new FormData();
      formData.append('avatar', file.raw);
      formData.append('userId', cookieUtil.getCookie("userId"));
      try {
        const results = await requestUtil.fileUpload('user/update/avatar', formData);
        imageUrl.value = results.data.imageUrl; // 更新imageUrl为上传成功后的图片URL
        console.log(imageUrl);
        ElMessage({
          message: "上传成功！",
          type: "success"
        });
        setTimeout(function() {
          location.reload();
        }, 500);
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
@import "@/assets/css/basic.css";
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
  display: flex;
  font-size: 20px;
  margin-top: 3%;
  margin-bottom: 1.5%;
}
.avatar {
  cursor: pointer;
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
