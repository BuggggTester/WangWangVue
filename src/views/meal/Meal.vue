<script setup>
import {onMounted, ref} from "vue";
import requestUtil, {getServerUrl} from "@/util/request"
import {inputNumberEmits} from "element-plus";
const trip_id = 1
let foods = ref('')
let number = ref(0)
let rows = ref(0)
let cols = ref([])
onMounted(async () => {
  const rec = await requestUtil.get('food/select/tripId', {
    tripId: trip_id
  })
  foods.value = rec.data
  console.log(foods.value)
  number.value = foods.value.length
  rows.value = (number.value - 1) / 3 + 1
  while (number.value > 0){
    cols.value.push(number.value < 3 ? number.value : 3)
    number.value -= 3
  }
  console.log(rows.value)
  console.log(cols.value)
})
</script>

<template>
  <div>
    <p style="font-size: 25px; font-family: serif; margin-bottom: 10px">&nbsp;&nbsp;火车餐购买</p>
    <el-scrollbar height="100%">
      <el-row v-for="i in rows" :gutter="20" justify="space-around">
        <el-col v-for="j in cols[i-1]" :key="j" :span="7">
          <el-card class="card" shadow="always" :body-style="{height:'125px', width:'100%', boxSizing:'border-box'}">
            <template #header><p style="font-size: 20px">{{ foods[j - 1 + (i-1) * 3].name}}</p></template>
            <el-row :gutter="50">
              <el-col :span="10">
                <img :src="getServerUrl() + foods[j - 1 + (i-1) * 3].picture_path" width="170"/>
              </el-col>
              <el-col :span="13">
                <p style="color: #6b778c">{{ foods[j - 1 + (i-1) * 3].description}}</p>
              </el-col>
            </el-row>
            <template #footer class=".el-card__footer">
              <el-row :gutter="15">
                <el-col :span="12"><p style="font-size: 20px; margin-top: 5px; color: #ff8800" type="flex" >￥{{ foods[j - 1 + (i-1) * 3].price}}</p></el-col>
                <el-col :span="12"><el-button type="primary" plain class="button">立即购买</el-button></el-col>
              </el-row>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<style>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.card{
  width: 100%;
  height: 240px;
  margin: 10px;
}
p{
  word-wrap: break-word;
  word-break: break-all;
}
button{
  margin-left: 50%;
}
.el-card__footer {
  border-top: 1px solid var(--el-card-border-color);
  box-sizing: border-box;
  padding: calc(var(--el-card-padding) - 8px) var(--el-card-padding);
}
</style>