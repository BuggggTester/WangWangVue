<script>
export default {
  name: "NoOrder"
}
</script>

<template>
  <div class="container">
    <div class="top-section">
      <div class="blue-box">
        <div style="display: flex; flex-direction: row">
          <img src="../assets/images/empty.png" alt="暂无"/>
          <p class="character">您没有未完成的订单哦～<br>
            您可以通过<el-link type="primary" style="font-size: 20px">车票预订</el-link>功能，来制定出行计划。</p>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    <div class="bottom-section">
      <div class="yellow-box">
        <p class="character" >温馨提示:<br>
          1.席位已锁定，请在指定时间内完成网上支付。
          <br>
          2.逾期未支付，系统将取消本次交易。
          <br>
          3.在完成支付或取消本订单之前，您将无法购买其他车票。
          <br>
          4.未尽事宜详见《国铁集团铁路旅客运输规程》《广深港高速铁路跨境旅客运输组织规则》《中老铁路跨境旅客联运组织规则》等有关规定和车站公告。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spacer {
  flex: 0.1;
}
.container {
  width: 100%; /* 调整容器宽度 */
  height: 700px; /* 调整容器高度 */
  display: flex;
  flex-direction: column;
}

.top-section {
  flex: 7; /* 占据上面70%的空间 */
}

.bottom-section {
  flex: 3; /* 占据下面30%的空间 */
}

.blue-box {
  border-radius: 10px; /* 设置圆角 */
  border: 2px solid lightblue; /* 设置外框 */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.yellow-box {
  display: flex; /* 使用 flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: lightyellow;
  border-radius: 20px; /* 设置圆角 */
  border: 2px solid orange; /* 设置外框 */
  width: 100%;
  padding: 10px;
  height: 100%;
}

.character {
  font-weight: lighter;
  font-size: 20px;

}
</style>