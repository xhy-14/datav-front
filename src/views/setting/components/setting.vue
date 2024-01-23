<template>
  <el-tabs :tab-position="tabPosition" style="padding-left: 138px;" class="demo-tabs">
    <el-tab-pane label="个人资料">
     <profile />
    </el-tab-pane>
    <el-tab-pane label="会员套餐">
      <vip />
    </el-tab-pane>
    <el-tab-pane label="订单列表">
      <order />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import profile from './profile.vue'
import vip from './vip.vue'
import order from './order.vue'

const tabPosition = ref('left')
</script>

<style>

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.demo-tabs>.el-tabs__content {
  padding-left: 32px;
  /* color: #6b778c; */
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs {
  font-size: 200px;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.el-tabs--left .el-tabs__item.is-left {
  width: 200px;
  text-align: right;
  font-size: 20px;
  justify-content: flex-start;
}
</style>
  