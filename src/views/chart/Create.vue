<template>
  <div class="chart-page">
    <div class="chart-header">
      <div class="chart-header-left-icon">
        <h2>创建图表</h2>
      </div>
      <div class="chart-header-left-button">
        <el-button @click="dialogVisible = true" type="primary">保存</el-button>
        <el-button @click="back()">取消</el-button>
      </div>
    </div>
    <div class="chart-content">
      <div class="data-select">
        <div class="dataset-select">
          <el-select v-model="selectDataset" class="m-2" placeholder="请选择数据集" style="border:none">
            <el-option
              v-for="item in myDataset"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>

        <div class="data-info">
          <div class="dataset-name">
            <el-icon style="margin-left: 10px">
              <Grid />
            </el-icon>
            <h4 style="margin-left: 5px" v-html="currentDatasetName"></h4>
          </div>

          <el-scrollbar style="height: 94%;">
            <div
              v-for="(item, index) in currentDataset.headers"
              class="dataset-col"
              draggable="true"
              @dragstart="dragStart($event, item)"
            >
              <div class="dataset-col-item">
                <el-icon style="margin-left: 25px">
                  <Discount />
                </el-icon>
                <p style="margin-left: 5px">{{ item }}</p>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>

      <div class="create-chart">
        <div class="create-chart-view">
          <div class="create-chart-view-left">
            <div class="create-chart-view-left-title">
              <div>设置你的图表</div>
            </div>

            <div class="create-chart-view-left-config">
              <BarConfig v-if="chartType === 'bar'"></BarConfig>
              <LineConfig v-if="chartType === 'line'"></LineConfig>
              <PieConfig v-if="chartType === 'pie'"></PieConfig>
              <ScatterConfig v-if="chartType === 'scatter'"></ScatterConfig>
              <RadarConfig v-if="chartType === 'radar'"></RadarConfig>
              <KLineConfig v-if="chartType == 'k-line'"></KLineConfig>
              <MoreBarConfig v-if="chartType == 'more-bar'"></MoreBarConfig>
              <PolarConfig v-if="chartType == 'polar'"></PolarConfig>
              <FunnelConfig v-if="chartType == 'funnel'"></FunnelConfig>
              <HeatConfig v-if="chartType == 'heat'"></HeatConfig>
              <RiverConfig v-if="chartType == 'river'"></RiverConfig>
            </div>
          </div>

          <div class="create-chart-view-right">
            <div class="chart-select">
              <el-popover
                @click="changeChart('line')"
                placement="top-start"
                title="折线图"
                :width="200"
                trigger="hover"
                content="折线图"
              >
                <template #reference>
                  <div @click="changeChart('line')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-line" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                @click="changeChart('bar')"
                placement="top-start"
                title="柱状图"
                :width="200"
                trigger="hover"
                content="柱状图"
              >
                <template #reference>
                  <div @click="changeChart('bar')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="多重柱状图"
                :width="200"
                trigger="hover"
                content="多重柱状图"
              >
                <template #reference>
                  <div @click="changeChart('more-bar')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-more_bar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="极坐标柱状图"
                :width="200"
                trigger="hover"
                content="极坐标柱状图"
              >
                <template #reference>
                  <div @click="changeChart('polar')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-polar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="饼状图"
                :width="200"
                trigger="hover"
                content="饼状图"
              >
                <template #reference>
                  <div @click="changeChart('pie')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-pie" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="散点图"
                :width="200"
                trigger="hover"
                content="散点图"
              >
                <template #reference>
                  <div @click="changeChart('scatter')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-scatter" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="雷达图"
                :width="200"
                trigger="hover"
                content="雷达图"
              >
                <template #reference>
                  <div @click="changeChart('radar')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-radar" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="k线图"
                :width="200"
                trigger="hover"
                content="k线图"
              >
                <template #reference>
                  <div @click="changeChart('k-line')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-kline" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="漏斗图"
                :width="200"
                trigger="hover"
                content="漏斗图"
              >
                <template #reference>
                  <div @click="changeChart('funnel')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-funnel" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="热力图"
                :width="200"
                trigger="hover"
                content="热力图"
              >
                <template #reference>
                  <div @click="changeChart('heat')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-heat" />
                    </svg>
                  </div>
                </template>
              </el-popover>

              <el-popover
                placement="top-start"
                title="河流图"
                :width="200"
                trigger="hover"
                content="河流图"
              >
                <template #reference>
                  <div @click="changeChart('river')" class="chart-select-item">
                    <svg class="charts-icon">
                      <use xlink:href="#icon-charts-river" />
                    </svg>
                  </div>
                </template>
              </el-popover>
            </div>
            <div class="chart-view">
              <Bar v-if="chartType == 'bar'"></Bar>
              <Line v-if="chartType == 'line'"></Line>
              <Pie v-if="chartType == 'pie'"></Pie>
              <Scatter v-if="chartType == 'scatter'"></Scatter>
              <Radar v-if="chartType == 'radar'"></Radar>
              <KLine v-if="chartType == 'k-line'"></KLine>
              <MoreBar v-if="chartType == 'more-bar'"></MoreBar>
              <Polar v-if="chartType == 'polar'"></Polar>
              <Funnel v-if="chartType == 'funnel'"></Funnel>
              <Funnel v-if="chartType == 'heat'"></Funnel>
              <River v-if="chartType == 'river'"></River>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="上传数据集" width="35%">
      <el-form label-width="100px" style="max-width: 560px">
        <el-row class="form-item" :gutter="20">
          <h2>图表明名</h2>
          <el-input
            v-model="saveChartForm.name"
            class="w-50 m-2"
            placeholder="数据集名"
          />
        </el-row>

        <el-row class="form-item" :gutter="20">
          <h2>描述</h2>
          <el-input
            v-model="saveChartForm.depicition"
            class="w-50 m-2"
            placeholder="描述"
          />
        </el-row>

        <el-row :gutter="16" class="form-item-submit">
          <el-button @click="save()" type="primary">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 图表组件
 */
import Bar from "@/components/chart/Bar.vue";
import BarConfig from "@/components/chart/BarConfig.vue";
import Line from "@/components/chart/Line.vue";
import LineConfig from "@/components/chart/LineConfig.vue";
import Pie from "@/components/chart/Pie.vue";
import PieConfig from "@/components/chart/PieConfig.vue";
import Scatter from "@/components/chart/Scatter.vue";
import ScatterConfig from "@/components/chart/ScatterConfig.vue";
import Radar from "@/components/chart/Radar.vue";
import RadarConfig from "@/components/chart/RadarConfig.vue";
import KLine from "@/components/chart/KLine.vue";
import KLineConfig from "@/components/chart/KLineConfig.vue";
import MoreBar from "@/components/chart/MoreBar.vue";
import MoreBarConfig from "@/components/chart/MoreBarConfig.vue";
import Polar from "@/components/chart/Polar.vue";
import PolarConfig from "@/components/chart/PolarConfig.vue";
import Funnel from "@/components/chart/Funnel.vue";
import FunnelConfig from "@/components/chart/FunnelConfig.vue";
import Heat from "@/components/chart/Heat.vue";
import HeatConfig from "@/components/chart/HeatConfig.vue";
import River from "@/components/chart/River.vue";
import RiverConfig from "@/components/chart/RiverConfig.vue";
import { ElMessage, ElLoading } from 'element-plus'
import { myDatasetApi, getDatasetApi } from "@/api/table/index.ts";
import { useChartStore } from "@/store/chart.ts";
import { saveChartApi } from "@/api/chart/chart.ts";
export default {
  components: {
    Bar,
    BarConfig,
    Pie,
    PieConfig,
    Line,
    LineConfig,
    Scatter,
    ScatterConfig,
    Radar,
    RadarConfig,
    KLine,
    KLineConfig,
    MoreBar,
    MoreBarConfig,
    Polar,
    PolarConfig,
    Funnel,
    FunnelConfig,
    Heat,
    HeatConfig,
    River,
    RiverConfig
  },
  data() {
    return {
      myDataset: [],
      currentDataset: {},
      selectDataset: "请选择数据集",
      currentDatasetName: "请选择数据集",
      chartStore: null,
      currentDatasetID: 0,
      chartType: "bar",
      dialogVisible: false,
      // 图表保存表单
      saveChartForm: {
        chartTypeId: 1,
        depicition: "",
        metadataId: 0,
        name: "",
        option: {}
      }
    };
  },
  mounted() {
    // 获取我的数据集
    this.chartStore = useChartStore();
    myDatasetApi()
      .then(result => {
        this.myDataset = result.data;
      })
      .catch(err => {});
  },
  methods: {
    dragStart(event, header) {
      event.dataTransfer.setData("header", header);
    },
    changeChart(type) {
      this.chartType = type;
    },
    back() {
      this.$router.replace("/workplace/chart");
    },
    save() {
      this.saveChartForm.metadataId = this.currentDatasetID;
      this.saveChartForm.option = this.chartStore.options;
      saveChartApi(this.saveChartForm).then(res=>{
        if(res.code === '00000') {
          ElMessage.success("保存成功");
        } else {
          ElMessage.error("保存失败");
        }
        this.dialogVisible = false;
      }).catch(err=>{

      })
    }
  },
  watch: {
    selectDataset(newVal, oldVal) {
      getDatasetApi(this.selectDataset).then(res => {
        this.currentDatasetID = res.data.id;
        this.currentDataset = res.data.data;
        this.currentDatasetName = res.data.name;
        this.chartStore.saveData(res.data.data);
      });
    }
  }
};
</script>

<style>
.chart-page {
  width: 100%;
  height: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  height: 7%;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
}

.chart-header-left-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header-left-icon {
  width: 250px;
}
.chart-content {
  width: 100%;
  height: 93%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
}

.data-select {
  width: 16%;
  height: 100%;
  background-color: white;
}

.dataset-select {
  height: 5%;
  display: flex;
  justify-content: center;
}

.data-info {
  height: 95%;
  justify-content: center;
}

.dataset-name {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 36px;
}

.dataset-col-item {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 36px;
}

.create-chart {
  width: 95%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}

.create-chart-view {
  width: 98%;
  height: 96%;
  display: flex;
  justify-content: space-between;
}

.create-chart-view-left {
  width: 24%;
  height: 100%;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.create-chart-view-right {
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.create-chart-view-left-title {
  height: 10%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-chart-view-left-config {
  height: 88%;
  background-color: white;
}

.chart-select {
  height: 15%;
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-gap: 10px;
  padding: 5px;
}

.chart-view {
  height: 84%;
  width: 100%;
  background-color: white;
}

.chart-view-title {
  height: 10%;
  width: 100%;
  background-color: white;
}

.chart-view-config {
  height: 90%;
  width: 100%;
  background-color: white;
}

.chart-select-item {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
}
.chart-select-item:hover {
  background-color: rgb(101, 183, 251);
  cursor: pointer;
}

.charts-icon {
  width: 90%;
  height: 90%;
}
</style>