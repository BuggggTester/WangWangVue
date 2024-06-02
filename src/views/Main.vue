<template>
  <div style="align-items: center ">
    <div style="width: 100%;height: 30%; background-color: #25a4bb;">
    <el-carousel :interval="4000" height="300px">
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <img :src="item.src" alt="carousel-image">
      </el-carousel-item>
    </el-carousel>
      <div class="overlay">
        <el-tabs :tab-position="tabPosition" v-model="searchType" style="height: 100%" class="demo-tabs" type="border-card">
          <el-tab-pane label="车票" name="first">
            <div class="component">
              <span class="demonstration">出发地</span>
              <el-cascader
                  size="medium"
                  style="width: 65%; padding-left: 7%"
                  :options="pcTextArr"
                  v-model="departureOption">
              </el-cascader>
            </div>
            <div class="component">
              <span class="demonstration">目的地</span>
              <el-cascader
                  size="medium"
                  style="width: 65%; padding-left: 7%"
                  :options="pcTextArr"
                  v-model="selectedOption">
              </el-cascader>
            </div>
            <div class="component">
              <span class="demonstration">发车时间</span>
              <el-date-picker
                  v-model="startTime"
                  type="date"
                  placeholder="选择发车时间"
                  :default-time="defaultTime"
                  style="padding-left: 5%; width: 56%;"
              />
            </div>
            <div class="component">
              <el-checkbox v-model="checked1" label="学生" size="large" />
              <el-button type="primary" @click="searchTrips" style="margin-left: 20px">查询</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="常用查询" name="second"></el-tab-pane>
          <el-tab-pane label="订餐" name="third">订餐</el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="suggestTrip">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="铁路旅游" name="first"></el-tab-pane>
      </el-tabs>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(trip, index) in travelInf" :key="index">
          <el-card style="max-width: 480px">
            <img :src="trip.photo" style="width: 100%" class="card-image" />
            <template #footer>{{ trip.title }}</template>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
<!--  <div id="app">-->

<!--  </div>-->
</template>

<script setup>
import {pcTextArr} from 'element-china-area-data'
import {onMounted, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import requestUtil from '@/util/request'
import timeUtil from '@/util/time'
import cookieUtil from "@/util/cookie"
import router from "@/router";
const tabPosition = ref('left')
const departureOption = ref([])
const selectedOption = ref([])
const checkbox = ref('')
const searchType = ref('first')
const startTime = ref([])
let user = ref('')
const images = [
  { src: require('@/assets/images/carousel/image1.png') }, // 假设图片资源存放在 assets 目录下
  { src: require('@/assets/images/carousel/image2.png') },//
  { src: require('@/assets/images/carousel/image3.png') },
  { src: require('@/assets/images/carousel/image4.png') },
]
const activeName = ref('first');
const travelInf = ref([]);
onMounted(async() => {
  const res = await requestUtil.get('/travel/selectall');
  console.log(res);
  travelInf.value = res.data;
  travelInf.value.forEach(item=>{
    item.photo = requestUtil.getServerUrl() + item.photo;
  })
  console.log(travelInf.value);
});

const searchTrips = async () => {
  let dplace = departureOption.value.at(0)+'/'+departureOption.value.at(1);
  let splace = selectedOption.value.at(0)+'/'+selectedOption.value.at(1);
  console.log(dplace);
  console.log(splace);
  let time = timeUtil.formatDate(startTime.value);
  console.log(time);
  let param = {
    "fromPlace": dplace,
    "toPlace": splace,
    "startTime": time
  };
  console.log(JSON.stringify(param))
  try{
    let result =await requestUtil.post('/trip/select/place/time',param);
    console.log(result.data);
    router.push({path:'/ticket',query: param});
  }catch (e) {
    console.error(e);
  }
}
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
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
watch(searchType, (newVal, oldVal) => {
  // 根据新选中的选项卡名称执行相应的操作
  switch (newVal) {
    case 'first':
      // 执行 tab1 相关操作
      break;
    case 'second':
      // 执行 tab2 相关操作
      break;
    case 'third':
      break;
    default:
      break;
  }
});

</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 设置主轴方向为纵向，实现垂直布局 */
}
.component {
  margin-bottom: 5px; /* 设置组件之间的垂直间距为20px */
}
.demonstration {
  color: var(--el-text-color-secondary);
  font-size: small;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.overlay {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 45%;
  height: 30%;
  background-color: white;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.suggestTrip {
  padding-top: 30px;
}
.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.card-image {
  height: 200px; /* 设置图片的高度 */
  object-fit: cover; /* 控制图片如何适应容器尺寸 */
}
</style>
