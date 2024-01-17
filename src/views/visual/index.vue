<template>
  <el-container>
    <el-aside width="200px" style="text-align: center;">
      <div style="height: 600px">
        <el-steps direction="vertical" :active="active" finish-status="success">
          <el-step title="可视化" />
        </el-steps>
      </div>
    </el-aside>
    <el-main>
      <div v-show="active == 0">
        <CreateFile />
        <RouterView />
      </div>
    </el-main>
  </el-container>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
import CreateFile from "./CreateFile.vue";
import visual from "./visual.vue";
import selectData from "./visualSteps/selectData.vue";

const active = ref(0);
const next = () => {
  console.log(active.value);
  if (active.value++ > 1) active.value = 0;
};
const back = () => {
  if (active.value-- < 1) active.value = 1;
};
const complite = () => {
  //完成
  console.log("操作完成！");
};
</script>
  
<style>
.el-container {
  padding-left: 150px;
  padding-top: 70px;
  padding-right: 100px;
}

.flex-grow {
  flex-grow: 1;
}

.next {
  position: absolute;
  top: 636px;
  right: 200px;
}

.el-steps--vertical {
  height: 70%;
}
</style>
  