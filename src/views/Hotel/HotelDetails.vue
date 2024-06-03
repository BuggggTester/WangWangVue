<script setup>
import { ref, onMounted, watch } from 'vue';

// 使用 ref 创建响应式数据
const searchAddress = ref('');
const selectedSort = ref('price_asc'); // 默认排序方式
const hotel = ref({
  image: require('@/assets/images/carousel/image1.png'),
  rating: 4.9,
  name: "北京第十四酒店",
  description: "北京第十四家酒店，不是北京第四十号酒店，也不是北京第四十四号酒店",
  price: 329.15,
})
const rooms = ref([
  {
    image: require('@/assets/images/carousel/image1.png'),
    rating: 4.9,
    name: "北京第十四酒店",
    description: "北京第十四家酒店，不是北京第四十号酒店，也不是北京第四十四号酒店",
    price: 329.15,
  }
]); // 酒店列表
const tableScrollY = ref(300); // 表格滚动高度

// 使用 defineEmits 定义事件
const emit = defineEmits(['sort-change', 'view-details']);

// 定义方法
const handleSearch = () => {
  console.log('Search by address:', searchAddress.value);
  // TODO: 根据searchAddress发起搜索请求
};

const handleSortChange = (value) => {
  console.log('Sort by:', value);
  emit('sort-change', value); // 触发外部定义的事件
  // TODO: 根据selectedSort发起排序请求
};

const handleScroll = (event) => {
  const scrollElement = event.target;
  if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) {
    // 滚动到底部时加载更多
    console.log('Load more hotels');
    // TODO: 加载更多酒店数据
  }
};

const handleViewDetails = (hotel) => {
  console.log('View details for hotel:', hotel);
  emit('view-details', hotel); // 触发外部定义的事件
  // TODO: 打开查看酒店详情的页面或对话框
};
</script>

<template>
  <div class="home-box">
    <el-image style="width:100%;" :fit="contain" :src="require('@/assets/images/Hotel/topPic.jpg')" class="hotel-image" alt="顶部图片" />
    <div class="hotel-detail-page">
      <div class="hotel-name">
        <div>{{ hotel.name }}</div>
      </div>

      <el-card class="hotel-image-and-rate">
        <el-row>
          <el-col :span="19">
            <el-image :fit="cover" :src="hotel.image" class="hotel-image" alt="酒店图片" />
          </el-col>
          <el-col :span="5">
            <p class="rate-number">{{ hotel.rating }}</p>
          </el-col>
        </el-row>
      </el-card>

      <div class="room-select">
        <div class="room-select-name">
          房型选择
        </div>
        <ul class="room-list" style="overflow: auto">
          <li v-for="room in rooms" class="list-room-item">
            <el-card class="room-card" >
              <el-row class="room-row">
                <el-col :span="7">
                  <el-image :fit="cover" :src="room.image" class="room-image" alt="房间图片" />
                </el-col>
                <el-col :span="9">
                  <div class="room-info">
                    <h3 style="font-family: 微软雅黑; font-size: 20px; margin-bottom: 2%">{{ room.name }}</h3>
                    <div class="rating">
                      <el-rate
                          v-model="room.rating"
                          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                          :low-threshold="3"
                          :high-threshold="5"
                          show-score
                          disabled
                      ></el-rate>
                    </div>
                    <p style="color: #74767c;
                      font-family: 微软雅黑;
                      font-size: 16px;
                      margin-bottom: 2%;
                      line-height: 24px">{{ room.description }}</p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="price">
                    <span style="font-size: 14px">￥</span>
                    <span>{{ room.price }}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="price-details">
                    <el-button style="margin-top: 15%" size="large" round type="danger" @click="handleViewDetails">查看详情</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>

<style scoped>
.home-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
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
  margin-top: 1%;
  color: white;
  width:100%;
  align-items: center;
}

.hotel-image-and-rate {
  width: 100%;
  height: 40%;
}

.hotel-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
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
}

.room-card:hover {
  display: flex;
  flex-direction: column;
  height: 13%;
  margin-bottom: 1%;
  background-color: #ffd7c1;
}

.room-info {
  margin-left: 3%;
}

.price-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  margin-top: 15%;
}

.price {
  margin-top: 20%;
}

.price span {
  font-size: 24px;
  font-weight: bold;
  color: #ff681d;
}

.el-table {
  overflow: auto; /* 允许横向滚动 */
}
</style>