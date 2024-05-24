<template>
  <div class="suggestTrip">
    <el-tabs class="demo-tabs">
      <el-tab-pane label="当前铁路旅游" name="first"></el-tab-pane>
    </el-tabs>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(trip, index) in trips" :key="index">
        <el-card style="max-width: 480px">
          <img :src="trip.image" style="width: 100%" class="card-image" />
          <template #footer>{{ trip.title }}</template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const trips = [
  {
    title: '“环西部火车游”高品质旅游办专线列车',
    image: require('@/assets/images/suggestTrips/card1.png')
  },
  {
    title: '“环西部火车游”陇上江南-行摄山',
    image: require('@/assets/images/suggestTrips/card2.png')
  },
  {
    title: '“环西部火车游”华夏寻根·人文始祖',
    image: require('@/assets/images/suggestTrips/card3.png')
  },
  {
    title: '“环西部火车游”精品旅游线路',
    image: require('@/assets/images/suggestTrips/card4.png')
  }
]
</script>

<style scoped>

</style>