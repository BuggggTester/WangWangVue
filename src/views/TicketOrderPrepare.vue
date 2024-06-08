<template>
<div class="page-container">

    <el-page-header :icon="ArrowLeft" @back="$router.push('/ticketdetail')">
        <template #content>
            <span class="head-trip-info">车票预定</span>
        </template>
    </el-page-header>

    <div class="spacer"></div> 

    <el-card style="width: 100%;">
        <span>请选择乘车人:</span>
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

    <el-card>
        <span>请选择支付方式:  </span>
        <el-radio-group v-model="selectedPaymentMethod">

            <el-radio-button label="wechat">
                <i class="icon-wechat"></i>
            </el-radio-button>
            <el-radio-button label="alipay">
                <i class="icon-alipay"></i>
            </el-radio-button>
            <el-radio-button label="bank">
                <i class="icon-bank"></i>
            </el-radio-button>

        </el-radio-group>        
    </el-card>
    

    <el-card>
        <span>请选择座位:  </span>
        <el-radio-group v-model="selectedSeatPlace">
            <el-radio label="window" disabled>窗户</el-radio>
            <el-radio-button>
                <i class="icon-seat"></i>
            </el-radio-button>
            <el-radio-button>
                <i class="icon-seat"></i>
            </el-radio-button>
            <el-radio-button>
                <i class="icon-seat"></i>
            </el-radio-button>  
            <el-radio label="aisle" disabled>过道</el-radio>
            <el-radio-button>
                <i class="icon-seat"></i>
            </el-radio-button>
            <el-radio-button>
                <i class="icon-seat"></i>
            </el-radio-button>
            <el-radio label="window" disabled>窗户</el-radio>
        </el-radio-group>        
    </el-card>
    
    <div>
        <el-button @click="order" type="primary" style="margin-left:20%;margin-top:20px;height:40px;width:200px">预定</el-button>
        <el-button @click="decideVisible = false" style="margin-left:20%;margin-top:20px;height:40px;width:200px">取消</el-button>
    </div>
    <el-dialog v-model="decideVisible">
        
    </el-dialog>

</div>

</template>

<script setup>
import { useRoute } from 'vue-router';
import {defineProps, onMounted,ref} from 'vue';
import requestUtil from '@/util/request'
import timeUtil from '@/util/time'
import IdentityCard from "@/views/IdentityCard.vue";
import {ElMessage} from "element-plus";
import cookieUtil from "@/util/cookie"
import router from "@/router";
import time from '@/util/time';
const passengers = ref([]);
const addVisible = ref(false);
const newName = ref("");
const newPhone = ref("");
const newIdentity = ref("");

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

const orderDialogVisible = ref(false);
const selectedPaymentMethod = ref(null);
const selectedSeatPlace = ref(null);

const order = () => {
    if (selectedPaymentMethod.value === 'wechat') {
        console.log('使用微信支付');
    } else if (selectedPaymentMethod.value === 'alipay') {
        console.log('使用支付宝支付');
    } else if (selectedPaymentMethod.value === 'bank') {
        console.log('使用银行卡支付');
    } else {
        console.log('请选择支付方式');
    }

    orderDialogVisible.value = false;
};

</script>

<style scoped>
.ticket-card {
width: 95%;
border-radius: 4px;
}

.ticket-info {
padding:40px;
background-color: #c8eaf5; 
border-radius: 10px;
margin-bottom: 20px;
}

.buy-boarder{
padding:40px;
background-color: #c8eaf551; 
border-radius: 20px;
margin-bottom: 10px;
}

.button-container {
display: flex;
justify-content: center; /* 水平居中 */
align-items: center; /* 垂直居中 */
height: 100%; /* 可选：设置容器的高度 */
}


.ticket-time {
text-align: center;
font-size: 55px;
font-weight: bold;
}

.ticket-level{
text-align: center;
font-size: 30px;
font-weight: bold;
color:rgba(22, 97, 203, 0.796)
}

.ticket-price {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #f6392bd0;
}
.ticket-place {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
}

.time {
text-align: center;
color: gray;
font-size: 15px;
}

.availability {
text-align: center;
font-size: 20px;
font-weight: bold;
color: #12a72b;
}

.unavailability {
text-align: center;
font-size: 20px;
font-weight: bold;
color: #dc2323;
}

.el-row {
margin-bottom: 20px;
}
.el-row:last-child {
margin-bottom: 0;
}
.el-col {
border-radius: 4px;
}

.grid-content {
border-radius: 4px;
min-height: 36px;
}

.highlight-orange-text {
background-color: orange; 
color: white; 
padding: 1px 4px;
border-radius: 5px;
}

.highlight-green-text {
background-color: green; 
color: white; 
padding: 1px 4px;
border-radius: 5px;

}

.spacer {
    margin-bottom: 30px; /* 根据需要调整间距 */
}

.page-container {
background-color:rgba(177, 216, 238, 0.132);
background-size:auto;
}

.underline-container {
    position: relative;
    display: inline-block;
    font-size: 20px;
}

.underline-container::after {
    content: "";
    position: absolute;
    left: -500%; /* 左侧超出文本部分的长度 */
    right: -500%; /* 右侧超出文本部分的长度 */
    bottom: -20px; /* 控制下划线距离文本的位置 */
    height: 2px; /* 下划线的高度 */
    background-color: darkgray; /* 下划线颜色 */
}

.underline-text {
    position: relative;
    z-index: 1;
    font-size: 20px;
}

.icon-wechat {
    background-image: url('~@/assets/images/payMethod/wechat.png'); /* 使用webpack的别名指向图片路径 */
    background-size: contain; /* 调整图片尺寸 */
    background-repeat: no-repeat; /* 禁止背景图片重复 */
    width:160px; /* 设置图标宽度 */
    height: 200px; /* 设置图标高度 */
    display: inline-block; /* 将图标设置为行内块元素 */
}

.icon-alipay {
    background-image: url('~@/assets/images/payMethod/alipay.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 160px;
    height: 200px;
    display: inline-block;
}

.icon-bank {
    background-image: url('~@/assets/images/payMethod/bank.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 160px;
    height: 200px;
    display: inline-block;
}

.icon-seat{
    background-image: url('~@/assets/images/jinmao_seat.jpeg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 80px;
    height: 100px;
    display: inline-block;
}
@import "@/assets/css/card-order.css";
</style>


