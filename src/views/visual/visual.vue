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
        <div id="main" class="echarts-vue" style="width: 1000px; height: 400px;"></div>

      </el-main>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import chooseChart from './visualSteps/chooseChart.vue'
import note from './visualSteps/note.vue'
import * as echarts from 'echarts';
import { useChartStore } from '@/store/chart'


const label = {
            show: true,
            formatter: [
              'Plain text',
            ],
            position: 'top',
            distance: 10,
            padding: 10,
            color: '#000',
            fontSize: 20,
            lineHeight: 30,
          }
const chartInfo = useChartStore().chartInfo.info


const type = ref('pie')
const data = ref([])

const tabPosition = ref('left')
const initChart = () => {
  nextTick(() => {
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    var option = chartInfo

    console.log("option", option)
    const option_pie = {
      series: [
        {
          type: 'pie',
          
          data: [
            {
              value: 335,
              name: '1'
            },
            {
              value: 234,
              name: '2'
            },
            {
              value: 1548,
              name: '3'
            }
          ]
        }
      ]
    };
    if (type.value == 'pie') { myChart.setOption(option_pie); }
    else {
      console.log("chartInfo+++", chartInfo)
      option.series[0].type = type.value
      option.series[0].label = label
      myChart.setOption(option);
    }
    useChartStore().setChartInfo(option)
  })

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

})
</script>
  
<style>
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
  