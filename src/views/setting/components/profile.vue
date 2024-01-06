<template>
  <el-tabs :tab-position="tabPosition" style="padding-left: 138px;height: 200px" class="demo-tabs">
    <el-tab-pane v-for="o in 4" :key="o" label="User">
      <el-row>
        <el-col :span="24">
          <div class="grid-content ep-bg-purple-dark">
          <h4>编辑个人资料</h4>
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabPosition = ref('left')
</script>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}</style>
  