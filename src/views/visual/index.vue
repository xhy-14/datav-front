<template>
  <el-container>
    <el-aside width="200px" style="text-align: center;">
      <div style="height: 600px">
        <el-steps direction="vertical" :active="active" finish-status="success">
          <el-step title="上传文件" />
          <el-step title="可视化" />
          <el-step title="生成图表" />
        </el-steps>
      </div>
    </el-aside>
    <el-main>
      <div v-show="active == 0">
        <CreateFile @startVisual="getStartVisual" />
        <RouterView />
      </div>
      <div v-show="active == 1">
        <visual :active="active" />
        <RouterView />
      </div>
      <div v-show="active == 2">
        <Export :active="active" />
        <RouterView />
      </div>
    </el-main>
    <el-button class="next" type="success" v-if="active != 2" @click="next">继续</el-button>
    <el-button class="next" type="success" v-if="active == 2" @click="complite">完成</el-button>
    <el-button style="margin-right: 70px;" class="next" type="success" v-if="active != 0" @click="back">返回</el-button>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CreateFile from './CreateFile.vue';
import visual from './visual.vue';
import Export from './ExportChart.vue'
import { ElMessage } from "element-plus";

const active = ref(0)

const next = () => {
  if(active.value == 0 && nextVisual.value == false
  ){
  ElMessage.error("请先上传文件！");
  }
  else if(x.value == false || y.value == false){
  ElMessage.error("请先选择x轴和y轴！");

  }
  else if (active.value++ > 2) active.value = 0
  console.log(active.value, "index")

}
const back = () => {
  if (active.value-- < 1) active.value = 1
}
const complite = () => {
  //完成
  console.log("操作完成！")
}
let nextVisual = ref(false)
let x = ref(false)
let y = ref(false)
const getStartVisual =( next:any, xAxis:any, yAxis:any)=>{
  nextVisual=next
  x.value=xAxis
  y.value=yAxis
  console.log(next, xAxis,yAxis)
}

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

