<template>
  <div class="suggestTrip">
    <el-tabs v-model="active" class="demo-tabs">
      <el-tab-pane label="当前铁路旅游" name="first"/>
    </el-tabs>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(trip, index) in trips" :key="index">
        <el-card style="max-width: 480px" @click="openDialog(trip)">
          <img :src="trip.image" style="width: 100%" class="card-image"/>
          <template #footer>{{ trip.title }}</template>
        </el-card>
        <el-dialog
            v-model="trip.dialogVisible"
            :visible.sync="trip.dialogVisible"
            title="修改订单"
            width="1000"
            :trip="trip"
        >
          <div class="component">
          <el-input v-model="title" style="width: 500px" placeholder="请输入标题（不超过30个字）" clearable="true"/>
          </div>
          <br>
          <div class="component">
            <el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
            >
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
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="closeDialog(trip)">返回</el-button>
              <el-button @click="modifyTrip(trip)">
                提交修改
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import requestUtil from "@/util/request";
import { UploadFilled } from '@element-plus/icons-vue'

const active = ref('first');
const travels = ref([]);
const trips = ref([]);
let title = ref('');
const fetchData = async () => {
  const results = await requestUtil.get('/travel/selectall');
  travels.value = results.data;
  console.log(travels.value);
};
const openDialog = (trip) => {
  title.value = trip.title;
  trip.dialogVisible = true;
}
const closeDialog = (trip) => {
  title.value = '';
  trip.dialogVisible = false;
}
const modifyTrip = (trip) => {

}
onMounted(async () => {
  await fetchData();

  // 在异步操作完成后执行后续逻辑
  console.log(travels.value.length);
  trips.value = [
    {
      title: travels.value[0].title,
      image: require('@/assets/images/suggestTrips/card1.png'),
      dialogVisible: false
    },
    {
      title: travels.value[1].title,
      image: require('@/assets/images/suggestTrips/card2.png'),
      dialogVisible: false
    },
    {
      title: travels.value[2].title,
      image: require('@/assets/images/suggestTrips/card3.png'),
      dialogVisible: false
    },
    {
      title: travels.value[3].title,
      image: require('@/assets/images/suggestTrips/card4.png'),
      dialogVisible: false
    }
  ];

  console.log(trips.value);
});

</script>

<style scoped>
@import "@/assets/css/card-image.css";
</style>