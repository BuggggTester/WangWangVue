<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import requestUtil from "@/util/request"
import cookieUtil from "@/util/cookie"
import {useRoute} from "vue-router";
import {getServerUrl} from "@/util/request";
import router from "@/router";

// document.getElementsByClassName("main").style['padding'] = '0px';
// 使用 ref 创建响应式数据
const searchAddress = ref('');
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const startTime = ref("2024-06-09")
const endTime = ref("2024-06-10")
const hotel = ref({
  image: require('@/assets/images/carousel/image1.png'),
  rating: 4.9,
  name: "北京第十四酒店",
  description: "北京第十四家酒店，不是北京第四十号酒店，也不是北京第四十四号酒店。",
  price: 329.15,
})
const route = useRoute();
const hotel_id = ref(route.query.hotel_id);

const rooms = ref([]); // 房间列表

onMounted(async() => {
  const res = await requestUtil.get('/hotels/'+ hotel_id.value);
  hotel.value = res.data;


  const res_room = await requestUtil.post('/hotels/hotel/getRoom', {
    "hotelId": hotel_id.value,
    "startDate": startTime.value,
    "endDate": endTime.value,
  })
  rooms.value = res_room.data;

})


const tableScrollY = ref(300); // 表格滚动高度

// 使用 defineEmits 定义事件
const emit = defineEmits(['sort-change', 'view-details']);

// 定义方法
const handleSearchRoom = async () => {
  const res_room = await requestUtil.post('/hotels/hotel/getRoom', {
    "hotelId": hotel_id.value,
    "startDate": startTime.value,
    "endDate": endTime.value,
  })
  rooms.value = res_room.data;
};

const handleScroll = (event) => {
  const scrollElement = event.target;
  if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) {
    // 滚动到底部时加载更多
    console.log('Load more hotels');
    // TODO: 加载更多酒店数据
  }
};

const handleBookRoom = async (room) => {
  const res_id = await requestUtil.post('/hotels/book', {
    "userId": cookieUtil.getCookie("userId"),
    "hotelId": hotel_id.value,
    "roomType": room.room_type,
    "startDate": startTime.value,
    "endDate": endTime.value,
  });
  let reser_id = res_id.data.reservationId;
  const order = await requestUtil.post('/totalorder/create', {
    "userId": cookieUtil.getCookie("userId"),
    "order_type": "HOTEL",
    "reservation_id": reser_id,
    "payment": room.price,
  });

  try{
    await router.push({path: '/hotelorderprepare', query:
          {"res_id" : order.data.id, "hotel_id": hotel_id.value, "room_type": room.room_type}});
  }catch (e) {
    console.error(e);
  }
};

const nameIs = (a) => {
  if (a === "SINGLE") return "单人间"
  else if (a === "DOUBLE") return "双人间"
  else return "套房"
};

const isDateCorrect = computed(() => {
  let date1 = new Date(startTime.value);
  let date2 = new Date(endTime.value);
  if (date1 >= date2) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <div class="home-box">
    <el-image style="width:100%;" :fit="contain" :src="require('@/assets/images/Hotel/topPic.jpg')" class="hotel-page-image" alt="顶部图片" />
    <div class="hotel-detail-page">
      <div class="hotel-name">
        <div>{{ hotel.name }}</div>
      </div>

      <div class="hotel-image-and-rate">
        <el-row>
          <el-col :span="17">
            <el-image :fit="cover" :src="getServerUrl() + hotel.picture_path" class="hotel-image" alt="酒店图片" />
          </el-col>
          <el-col :span="7">
            <div class="hotel-class">
              <span class="rate-number">{{ hotel.score }}</span>
              <span class="rate-number-fen">分</span>
              <p class="hotel-description">{{ hotel.description }}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="date-selector">
        <span class="demonstration">从</span>
        <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择入住时间"
            :default-time="defaultTime"
            style="padding-left: 2%; padding-right: 2%; width: 30%;"
            value-format="YYYY-MM-DD"
        />
        <span class="demonstration">到</span>
        <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择离开时间"
            :default-time="defaultTime"
            style="padding-left: 2%; padding-right: 2%; width: 30%;"
            value-format="YYYY-MM-DD"
        />
        <el-button
            type="primary"
            style="margin-left: 3%"
            @click="handleSearchRoom"
        >查询</el-button>
        <span
            style="margin-left: 3%; color: red;"
            v-show="isDateCorrect"
        >
          日期错误！
        </span>
      </div>
      <div class="room-select">
        <div class="room-select-name">
          房型选择
        </div>
        <ul class="room-list" style="overflow: auto">
          <li v-for="room in rooms" class="list-room-item">
            <div class="room-card" >
              <el-row class="room-row">
                <el-col :span="6">
                  <el-image :fit="cover" :src="room.image" class="room-image" alt="房间图片" />
                </el-col>
                <el-col :span="8">
                  <div class="room-info">
                    <h3 style="color: white; font-family: 微软雅黑; font-size: 24px; margin-bottom: 2%">{{ nameIs(room.room_type) }}</h3>
                    <p style="color: #adb1b9;
                      font-family: 微软雅黑;
                      font-size: 16px;
                      margin-bottom: 2%;
                      line-height: 24px">{{ room.description }}</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="capable">
                    <span>剩余{{room.availableQuantity}}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="price">
                    <span style="font-size: 14px">￥</span>
                    <span>{{ room.price }}</span>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="price-details">
                    <el-button style="margin-top: 15%"
                               size="large"
                               round
                               type="danger"
                               @click="handleBookRoom(room)"
                               :disabled=isDateCorrect
                    >预订</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>

<style scoped>
.home-box {
  position: relative;
  width: 102.9%;
  height: 107%;
  margin-top: -50px;
  margin-left: -20px;
  margin-right: -20px;
  background-color: #101e41;
  overflow: auto;
}

.hotel-detail-page {
  padding: 0px;
  margin-left: 5%;
  margin-right: 5%;
}

.hotel-name {
  font-family: 微软雅黑;
  font-size: 40px;
  margin-bottom: 3%;
  margin-top: 2%;
  color: #9eb5ff;
  width:100%;
  text-align: center;
}

.hotel-image-and-rate {
  width: 100%;
  height: 40%;
  background: linear-gradient(#101e41, #1e2548);
}

.hotel-class {
  font-size: 20px;
  padding: 4%;
  line-height: 30px;
}

.hotel-page-image {
  width: 100%;
  height: auto;
  display: block;
}

.hotel-image {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 4px;
  border: 1px solid white;
}

.rate-number {
  margin-left: 3%;
  font-size: 35px;
  color: #ff681d;
  font-family: 微软雅黑;
}

.rate-number-fen {
  margin-left: 3%;
  font-size: 20px;
  color: #ff681d;
  font-family: 微软雅黑;
}

.hotel-description {
  margin-left: 3%;
  margin-top: 5%;
  color: white;
}

.date-selector {
  font-family: 微软雅黑;
  font-size: 20px;
  margin-top: 3%;
  margin-bottom: 3%;
}

/deep/ .el-input__wrapper {
  background-color: #6fa2a8;
}

/deep/ .el-input__inner {
  color: #000000;
}

/deep/ .el-input__inner::placeholder {
  color: #000000;
}

.demonstration {
  color: #9eb5ff;
}

.room-select-name {
  color: #9eb5ff;
  font-family: 微软雅黑;
  font-size: 24px;
}

.room-list {
  overflow: auto;
  width: 100%;
}

.list-room-item {
  margin-bottom: 1%;
}

.room-row {
  height: 100%;
  width: 100%;
}

.room-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}

.room-card {
  display: flex;
  flex-direction: column;
  height: 13%;
  margin-bottom: 1%;
  padding: 2%;
  background: linear-gradient(#101e41, #1e2548);
}

.room-card:hover {
  display: flex;
  flex-direction: column;
  height: 13%;
  margin-bottom: 1%;
  padding: 2%;
  background: #141b3a;
}

.room-info {
  margin-left: 3%;
}

.price-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-top: 15%;
}

.price {
  margin-top: 27%;
}

.price span {
  font-size: 35px;
  color: #ff681d;
}

.capable {
  margin-top: 41%;
  text-align: center;
}

.capable span {
  font-size: 20px;
  color: #ffffff;
}

.el-table {
  overflow: auto; /* 允许横向滚动 */
}
</style>