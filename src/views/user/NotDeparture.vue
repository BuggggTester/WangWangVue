<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select
                v-model="value1"
                size="large"
                placeholder="选择查询方式"
                style="width: 240px"
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="请选择起始日期"
                :shortcuts="shortcuts"
            />
          </el-col>
          <!--    <el-col :span="6">-->
          <!--      <el-date-picker-->
          <!--          v-model="value3"-->
          <!--          type="datetime"-->
          <!--          placeholder="请选择出发日期"-->
          <!--          :shortcuts="shortcuts"-->
          <!--      />-->
          <!--    </el-col>-->
          <el-col :span="6">
            <el-button type="primary" plain @click="searchOrders">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div v-if="orders.length > 0" v-for="order in orders" :key="order.order_id">
          <el-card class="trip-card">
            <template #header>
              <div class="card-header">
                <span><b>行程信息</b></span>
              </div>
            </template>
            <div class="trip-info">
              <div><b>车次：{{ order.trip.train_id }}</b></div>
              <div><b>起始站：{{ order.trip.from_place }}</b></div>
              <div><b>终点站：{{ order.trip.to_place }}</b></div>
              <div><b>发车时间：{{ order.trip.start_time }}</b></div>
              <div><b>座位：{{ order.row }} 排 {{ order.seat }} 座</b></div>
            </div>
            <template #footer>
              <el-button>查看订单</el-button>
              <el-button type="primary" plain @click="showDetailedOrder">修改订单</el-button>
              <el-button v-if="order.state !== 'canceled'" type="danger" plain @click="openCancelDialog">取消订单</el-button>
              <el-button v-else type="danger" plain disabled>订单已被取消</el-button>
              <el-dialog
                  v-if="dialogVisible"
                  :visible.sync="dialogVisible"
                  title="取消订单"
                  width="500"
              >
                <span>您确定要取消该订单吗？</span>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="closeCancelDialog">返回</el-button>
                    <el-button type="primary" @click="cancelOrder(order)">
                      残忍取消
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            </template>
          </el-card>
        </div>
        <div v-if="flag === 1" class="no-trip-card">
          <NoOrder/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import requestUtil from "@/util/request";
import NoOrder from "@/views/NoOrder.vue";
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value = ref('')
const orders = ref([])
const options = [
  {
    value: 'orderTime',
    label: '按订单日期查询'
  },{
    value: 'startTime',
    label: '按发车时间查询'
  }
]

let Date1= 'Tue May 14 2024 11:24:55 GMT+0800 (中国标准时间)';
let Date2= '2021-08-15';
let Date3= '2021-08-15 09:15:00';
let Date4 = '2024-06-25 00:00:00'
let flag = 0;
//实现方法
function date (date) {
  let result = new Date(date).getTime();
  return result;
}
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
const searchOrders =  async () => {
  console.log(value1.value)
  const params = {};
  params[value1.value] = formatDate(value2.value); // 将key参数添加到params对象中
  console.log(formatDate(value2.value))
  try {
    const results = await requestUtil.get(`/order/select/notdeparture/1/orderTime`, params); // 将params对象作为第二个参数传递给get方法
    orders.value = results.data;
    console.log(orders.value.length);
    if(orders.value.length === 0) {
      flag = 1;
    }
  } catch (error) {
    console.error(error);
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
</script>
