<template>
  <div id="app" class="container">
    <div class="component">
      出发地
      <el-cascader
          size="large"
          :options="pcTextArr"
          v-model="departureOption">
      </el-cascader>
    </div>
    <div class="component">
      目的地
      <el-cascader
          size="large"
          :options="pcTextArr"
          v-model="selectedOption">
      </el-cascader>
    </div>
    <div class="component">
      选择车型
      <el-select
          v-model="value"
          placeholder="请选择车型"
          size="large"
          style="width: 200px"
      >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div class="component">列车编号：
      <el-input v-model="num" style="width: 200px" placeholder="请输入列车编号" />

    </div>
    <div class="component">
      <span class="demonstration">发车时间</span>
      <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择发车时间"
          :default-time="defaultTime"
      />
    </div>
    <div class="component">
      <span class="demonstration">到达时间</span>
      <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择到达时间"
          :default-time="defaultTime"
      />
    </div>
    <div class="component">
      <span class="demonstration">列车车厢数</span>
      <el-input-number v-model="num_car" :min="1" :max="10"/>
    </div>
    <div class="component">
      <span class="demonstration">每车厢排数</span>
      <el-input-number v-model="num_row" :min="1" :max="10"  />
    </div>
    <div class="button-container">
      <el-button type="primary" @click="createTrips">创建</el-button>
    </div>

  </div>
</template>
<script setup>
import {pcTextArr} from 'element-china-area-data'
import {ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import requestUtil from '@/util/request'
import {ElMessage} from "element-plus";
const departureOption = ref([])
const selectedOption = ref([])
const value = ref('')
const num = ref('')
const options = [
  {
    value: 'C',
    label: '城际快速列车C',
  },
  {
    value: 'D',
    label: '动车组D',
  },
  {
    value: 'Z',
    label: '直达特快列车Z',
  },
  {
    value: 'K',
    label: '跨局快速列车K',
  },
  {
    value: 'G',
    label: '高速列车G',
  },
]
function formatDate (d) {
  var date = new Date(d);
  var YY = date.getFullYear() + '-';
  var MM =
      (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-';
  var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hh =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':';
  var ss =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + ' ' + hh + mm + ss;
}
let dplace = ref('')
let splace = ref('')
function date (date) {
  let result = new Date(date).getTime();
  return result;
}
const createTrips = async () => {
  dplace = departureOption.value.at(0)+'/'+departureOption.value.at(1);
  splace = selectedOption.value.at(0)+'/'+selectedOption.value.at(1);
  console.log(dplace);
  console.log(splace);
  console.log(value.value);
  console.log(formatDate(startTime.value));
  console.log(formatDate(endTime.value));
  console.log(num_car.value);
  console.log(num_row.value);
  console.log(num.value);
  let train_id = value.value + num.value;
  let par = {
    "startTime": formatDate(startTime.value),
    "endTime": formatDate(endTime.value),
    "fromPlace": dplace,
    "toPlace": splace,
    "numCar": num_car.value,
    "numRow": num_row.value,
    "trainId": train_id
  };
  console.log(JSON.stringify(par));
  await requestUtil.post('/trip/create',par).then(response => {
    console.log("创建成功！")
  });then(response => {
    ElMessage(
        {
          message: "车次创建成功！",
          type: "success"
        }
    )
  })
}
const startTime = ref('')
const endTime = ref('')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const num_car = ref(1)
const num_row = ref(1)
const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      return date
    },
  },
]
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 设置主轴方向为纵向，实现垂直布局 */
}

.component {
  margin-bottom: 20px; /* 设置组件之间的垂直间距为20px */
}
</style>