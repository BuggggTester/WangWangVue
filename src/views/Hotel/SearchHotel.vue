<template>
  <div class="home-box">
    <div class="hotel-search-container">
      <el-image style="width:100%;" :fit="contain" :src="require('@/assets/images/Hotel/topPic.jpg')" class="hotel-image" alt="顶部图片" />
      <!-- 搜索栏 -->
      <el-row class="selector">
        <el-col :span="16">
          <div class="hotel-search-input">
            <el-input
                placeholder="在附近寻找酒店"
                v-model="searchAddress"
                class="search-bar"
                suffix-icon="el-icon-search"
                @keyup.enter="handleSearch"
            >
              <template #append>
                <el-button icon="el-icon-search" @click="handleSearch">搜索酒店</el-button>
              </template>
            </el-input>
          </div>
        </el-col>

      <!-- 筛选器栏 -->
        <el-col :span="8">
          <div class="filter-bar">
            <el-select
                v-model="selectedSort"
                placeholder="请选择排序方式"
                class="filter-item"
                @change="handleSortChange"
            >
              <el-option label="价格最低" value="price_asc"></el-option>
              <el-option label="价格最高" value="price_desc"></el-option>
              <el-option label="评分最高" value="rating_desc"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <!-- 无限滚动列表 -->
      <ul v-if="ifempty" v-infinite-scroll="handleScroll" class="hotel-list" style="overflow: auto">
        <li v-for="hotel in hotelsInfo" class="infinite-list-item">
          <el-cards class="hotel-card">
            <el-row style="margin-top: 2%; margin-left: 1%; margin-right: 1%;" class="hotel-row">
              <el-col :span="10">
                <el-image :fit="cover" :src="getServerUrl() + hotel.picture_path" class="hotel-image" alt="酒店图片" />
              </el-col>
              <el-col :span="9">
                <div class="hotel-info">
                  <h3 style="color: white; font-family: 微软雅黑; font-size: 25px; margin-bottom: 2%">{{ hotel.name }}</h3>
                  <div class="rating">
                    <el-rate
                        v-model="hotel.score"
                        :colors="['#ffffff', '#F7BA2A', '#FF9900']"
                        :low-threshold="3"
                        :high-threshold="5"
                        show-score
                        text-color="#ffffff"
                        disabled
                    ></el-rate>
                  </div>
                  <p style="color: #9eb5ff;
                      font-family: 微软雅黑;
                      font-size: 16px;
                      margin-bottom: 2%;
                      line-height: 24px">{{ hotel.address }}</p>
                  <p style="color: #9eb5ff;
                      font-family: 微软雅黑;
                      font-size: 16px;
                      margin-bottom: 2%;
                      line-height: 24px">{{ hotel.description }}</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="price-details">
                  <div class="price">
                    <span style="font-size: 14px">￥</span>
                    <span>{{ hotel.lowestPrice }}</span>
                    <span style="font-size: 14px">起</span>
                  </div>
                  <el-button style="margin-top: 7%" size="large" round type="primary" @click="handleViewDetails(hotel)">
                    <div style="color:#000000; font-weight: bold">查看详情</div>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-cards>
        </li>
      </ul>
      <div v-else style="margin-top:100px; text-align:center; line-height: 100px; font-size: 60px; color: white">前面的内容，以后再来探索吧~</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import requestUtil from "@/util/request"
import cookieUtil from "@/util/cookie"
import {getServerUrl} from "@/util/request";
import router from "@/router";
import {useRoute} from "vue-router";
const url = ref('');
const hotelsInfo = ref([]);
const hotels = ref([]);
const route = useRoute();
const address = ref(route.query.address);
const ifempty = ref(true)
onMounted(async() => {
  const res = await requestUtil.get(`/hotels/selectHotelByAddress`, {
    "address": address.value
  });
  hotelsInfo.value = res.data;
  url.value = res.data;
  if(hotelsInfo.value.length === 0){
    ifempty.value = false
  }

})

// 使用 ref 创建响应式数据
const searchAddress = ref('');
const selectedSort = ref('price_asc'); // 默认排序方式
const tableScrollY = ref(300); // 表格滚动高度

// 使用 defineEmits 定义事件
const emit = defineEmits(['sort-change', 'view-details']);

// 定义方法
const handleSearch = async () => {
  if (searchAddress.value === "") {
    searchAddress.value = "传奇机长";
  }
  const hot = await requestUtil.get('/hotels/selectHotelByAddress', {
    address: searchAddress.value
  });
  hotelsInfo.value = hot.data;

  if(hotelsInfo.value.length === 0){
    ifempty.value = false
  } else {
    ifempty.value = true
  }

  searchAddress.value = "";

  console.log(hotelsInfo.value)
};

const handleSortChange = async (value) => {
  if (value === "price_asc") {
    const hot = await requestUtil.get('/hotels/selectHotelByPriceASC', {
      "address": searchAddress.value
    });
    hotelsInfo.value = hot.data;
  } else if (value === "price_desc") {
    const hot = await requestUtil.get('/hotels/selectHotelByPriceDESC', {
      "address": searchAddress.value
    });
    hotelsInfo.value = hot.data;
  } else if (value === "rating_desc") {
    const hot = await requestUtil.get('/hotels/selectHotelByScore', {
      "address": searchAddress.value
    });
    hotelsInfo.value = hot.data;
  }
};

const handleScroll = (event) => {

  // const scrollElement = event.target;
  // if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) {
  //   // 滚动到底部时加载更多
  //   console.log('Load more hotels');
  //   // TODO: 加载更多酒店数据
  // }
  console.log('Load more hotels');
};

const handleViewDetails = (hotel) => {
  console.log(hotel.id);
  try{
    router.push({path: '/search/room', query:
          {"hotel_id" : hotel.id}});
  }catch (e) {
    console.error(e);
  }
};
</script>

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

.hotel-search-container {
  padding: 0px;
}

.hotel-search-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-left: 10%;
}

.selector {
  margin-left: 15%;
  width: 70%;
}

.hotel-list {
  margin-left: 12.5%;
  width: 75%;
}

.infinite-list-item {
  margin-bottom: 1%;
}

.search-bar-text {
  font-family: 微软雅黑;
  font-size: 20px;
  margin-bottom: 5px;
}

.hotel-row {
  height: 100%;
  width: 100%;
}

.search-bar {
  width: 70%;
}

.filter-bar {
  margin-right: 20%;
  text-align: right;
  margin-top: 3%;
}

.filter-item {
  width: 200px;
}

.hotel-image {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 4px;
}

.hotel-card {
  display: flex;
  flex-direction: column;
  height: 280px;
  background: linear-gradient(#101e41, #1e2548);
}

.hotel-card:hover {
  display: flex;
  flex-direction: column;
  height: 280px;
  background: #141b3a;
}

.hotel-info {
  margin-top: 3%;
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
  margin-top: 20%;
}

.el-main {
  --el-main-padding: 0 !important;
}
.price span {
  font-size: 35px;
  color: #ff681d;
}

</style>