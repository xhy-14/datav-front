<template>
  <div class="common-layout">
    <el-container style="padding: 0%;">
      <el-header>
        <div>
          <el-tabs :tab-position="tabPosition" style="height: 120px" class="demo-tabs">
            <el-tab-pane style="120px" label="图表">
              <chooseChart @currentType="getChilderVal" />
            </el-tab-pane>
            <el-tab-pane label="注释">
              <note @notes="getNotes" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-main>
        <div id="main" class="echarts-vue"></div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref, nextTick, watch } from 'vue'
import chooseChart from './visualSteps/chooseChart.vue'
import note from './visualSteps/note.vue'
import * as echarts from 'echarts';
import { useChartStore } from '@/store/chart'
import { pieApi, lineApi, barApi } from '@/api/chart/chart'

var chartInfo = useChartStore().chartInfo.info
const props = defineProps({
  active: Number
})

const type = ref('line')
const tabPosition = ref('left')
let option = chartInfo

const initChart = () => {
  
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    let parameter = useChartStore().parameter

    console.log("option view", option)
    if (type.value == 'pie') {
      pieApi(parameter)
        .then(res => {
          if (res.code == "00000") {
            option = res.data
          }
        })
        .catch(err => {
          ElMessage.error("连接失败！");
        });
    }
    else if (type.value == 'line') {
      lineApi(parameter)
        .then(res => {
          if (res.code == "00000") {
            option = res.data
          }
        })
        .catch(err => {
          ElMessage.error("连接失败！");
        });
    }
    else if (type.value == 'bar') {
      barApi(parameter)
        .then(res => {
          if (res.code == "00000") {
            option = res.data
            console.log(res,'res')
          }
        })
        .catch(err => {
          ElMessage.error("连接失败！");
        });
    }
    useChartStore().setChartInfo(option)
    console.log("option", option)
    console.log("opt store", useChartStore().chartInfo)
    myChart.setOption(option);

}

const getChilderVal = (currentType: string) => {
  type.value = currentType
  // location.reload();
  document.getElementById('main').removeAttribute("_echarts_instance_");
  document.getElementById('main').innerHTML = "";
  initChart();
  console.log(type.value, '123')
}
const getNotes = (notes: any) => {
  chartInfo.title.text = notes.title
  document.getElementById('main').removeAttribute("_echarts_instance_");
  document.getElementById('main').innerHTML = "";
  initChart();
}
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  initChart()
  console.log(chartInfo)
  console.log(props.active)
})
// watch(
//   () => props.active,
//   (newValue, oldval) => {
//     if (newValue == 1) {
//       initChart();
//     }

//     console.log(chartInfo, "visual", props.active, 'propsactive')
//   }
// )
</script>
  
<style>
#main {
  width: 1000px;
  height: 400px;


}


.el-tabs_item {
  padding: 0 20px 0px 0px;
}

.el-tab-pane {
  height: 100%;
}

.demo-tabs>.el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.el-main {
  padding: 0%;
}

.el-header {
  padding: 0;
  height: auto;
}

.flex-grow {
  flex-grow: 1;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
  