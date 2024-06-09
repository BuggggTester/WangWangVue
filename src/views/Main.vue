<template>
  <div style="align-items: center ">
    <div class="container">
      <div class="carousel-container">
        <!-- 这里放置走马灯的代码 -->
        <div style="width: 100%;height: 30%;">
          <el-carousel :interval="4000" height="400px">
            <el-carousel-item v-for="(item, index) in images" :key="index">
              <img :src="item.src" alt="carousel-image">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="overlay">
        <el-tabs :tab-position="tabPosition" v-model="searchType" style="height: 100%;" class="demo-tabs" type="border-card">
          <el-tab-pane label="车票" name="first" >
            <template v-slot:label >
              <div style="display: flex; flex-direction: column; align-items: center;">
                <i class="el-icon"><Van style="font-size: 48px;" /></i>
                <span style="margin-top: 5px;">车票</span>
              </div>
            </template>
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
                  style="padding-left: 5%; width: 70%;"
              />
            </div>
            <div class="component">
              <el-button type="primary" @click="searchTrips" style="margin-left: 70%">查询</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="酒店" name="second">
            <template v-slot:label>
              <div style="display: flex; flex-direction: column; align-items: center;">
                <i class="el-icon"><OfficeBuilding style="font-size: 48px;" /></i>
                <span style="margin-top: 5px;">酒店</span>
              </div>
            </template>
            <div class="component">
              <span class="demonstration">住宿地</span>
              <el-input
                  placeholder="输入目的地"
                  v-model="searchAddress"
                  class="search-bar"
                  suffix-icon="el-icon-search"
                  @keyup.enter="handleSearch"
                  style="width:70%; margin-left: 3%"
              >
              </el-input>
              <div class="component">
                <span class="demonstration">入住时间：</span>
                <el-radio-group v-model="selectStayDate">
                  <el-radio label="today">今天</el-radio>
                  <el-radio label="tomorrow">明天</el-radio>
                  <el-radio label="tomomo">后天</el-radio>
                </el-radio-group>
              </div>
              <div class="component">
                <!-- <el-row> -->
                <span class="demonstration">房间数</span>
                <!-- <el-col :span="8"> -->
                <el-select v-model="roomCount" placeholder="请选择房间数" style="padding-left: 3%; width: 28%;">
                  <el-option label="1" value="1" />
                  <el-option label="2" value="2" />
                  <el-option label="3" value="3" />
                  <!-- 其他房间数选项 -->
                </el-select>           
               <!--  </el-col> -->
                <span class="demonstration" style="padding-left: 3%;">星级</span>
                <!-- <el-col :span="8"> -->
                  <el-select v-model="starRating" placeholder="请选择星级" style="padding-left: 3%; width: 28%;">                  
                    <el-option label="★" value="1" />
                    <el-option label="★★" value="2" />
                    <el-option label="★★★" value="3" />
                    <el-option label="★★★★" value="4" />
                    <el-option label="★★★★★" value="5" />
                  </el-select>
                <!-- </el-col>
              </el-row> -->
              </div>
            <div>
              <el-button type="primary" style="margin-left: 70%" @click="handleSearch">搜索酒店</el-button>
            </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="订餐" name="third">
            <template v-slot:label>
              <div style="display: flex; flex-direction: column; align-items: center;">
                <i class="el-icon"><ForkSpoon style="font-size: 48px;" /></i>
                <span style="margin-top: 5px;">餐食</span>
              </div>
            </template>
            <div class="component">
              <span class="demonstration">发车时间</span>
              <el-date-picker
                  v-model="searchMealTime"
                  type="date"
                  placeholder="选择发车时间"
                  :default-time="defaultTime"
                  style="padding-left: 5%; width: 65%;"
              />

            </div>
            
            <div class="component">
              <span class="demonstration">火车车次</span>
              <el-input
                    placeholder="请输入火车车次"
                    v-model="searchTrainId"
                    class="search-bar"
                    suffix-icon="el-icon-search"
                    @keyup.enter="handleMealSearch"
                    style="width:60%; margin-left: 5%"
              >
              </el-input>
            </div>
            <div class="component">
              <el-button @click="gotoMealPage" type="primary" style="margin-left: 70%;">订餐</el-button>
            </div>
          </el-tab-pane>

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
import timeUtil, { formatDate } from '@/util/time'
import cookieUtil from "@/util/cookie"
import router from "@/router";
import {ElMessage} from "element-plus";
import messageUtil from "@/util/message"
const tabPosition = ref('left')
const departureOption = ref([])
const selectedOption = ref([])
const checkbox = ref('')
const searchType = ref('first')
const startTime = ref([])
const searchAddress = ref("")
let user = ref('')
const images = [
  { src: require('@/assets/images/carousel/landscape1.jpg') }, // 假设图片资源存放在 assets 目录下
  { src: require('@/assets/images/carousel/landscape2.jpg') },//
  { src: require('@/assets/images/carousel/landscape3.jpg') },
  { src: require('@/assets/images/carousel/landscape4.jpg') },
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
    await router.push({path: '/ticket',query: param});
  }catch (e) {
    console.error(e);
  }
}


const handleSearch = async () => {
  try{
    await router.push({path: '/search/hotel', query:
          {"address" : searchAddress.value}});
  }catch (e) {
    console.error(e);
  }
};

const searchMealTime = ref("")
const searchTrainId = ref("")
const gotoMealPage = () =>{
  if(searchMealTime.value == "") {
        ElMessage({
            message: "请输入用餐时间！",
            type: "warning"
        });
        return;
  }
  if(searchTrainId.value == "") {
        ElMessage({
            message: "请输入车次号！",
            type: "warning"
        });
        return;
  }
  console.log(searchMealTime.value);
  handleMealSearch();
  console.log(timeUtil.formatDate(searchMealTime.value));
  // router.push({path:'/meal'});
  router.push({
            path: '/meal',
            query: {
                "time": timeUtil.formatDate(searchMealTime.value),
                "trainId": searchTrainId.value
            }
        });
}

const handleMealSearch = async () => {
    try {
        await 
        console.log(searchMealTime.value);
        console.log(searchTrainId.value);
    } catch (error) {
        console.error(error);
    }
};


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

const selectStayDate = ref("");
const roomCount = ref("");
const starRating= ref("");

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

.input-hotel {
  font-family: 微软雅黑;
  font-size: 20px;
  font-weight: normal;
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
  border-radius: 20px;
}
.el-tabs__content .el-tabs__header {
  width: 100%; /* 设置宽度为100%，填充父容器的宽度 */
  height: 100%; /* 设置高度为100%，填充父容器的高度 */
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
