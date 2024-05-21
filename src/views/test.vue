<template>
  <div class="form-group" style="display: flex;">
    <div>
      <span>验证码：</span>
      <input type="text" id="code" v-model="code" class="code" placeholder="请输入验证码"/>
    </div>
    <div class="login-code" @click="refreshCode">
      <!--验证码组件-->
      <s-identify :identifyCode="identifyCode"></s-identify>
    </div>
    <div>
      <button @click="checkCaptcha">验证</button>
    </div>
  </div>

</template>

<script>
import SIdentify from '../views/sidentify'

export default {
  components: { SIdentify },
  data() {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      code: '',//text框输入的验证码
      tableData: []
    }
  },
  mounted: function() {
    this.identifyCode = ''
    // 初始化验证码
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    //验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ]
      }
      console.log("验证码",this.identifyCode)
    },
    // 检查验证码是否正确
    checkCaptcha(){
      if (this.code == ""){
        alert("请输入验证码")
        return false
      }
      if (this.identifyCode != this.code){
        this.code = ''
        this.refreshCode()
        alert("请输入正确的验证码")
        return false
      }
      console.log("验证码正确")
    }
  }
}
</script>

<style>
/*验证码样式*/
.code {
  width: 124px;
  height: 31px;
  border: 1px solid rgba(186, 186, 186, 1);
}

.login-code {
  cursor: pointer;
}
</style>