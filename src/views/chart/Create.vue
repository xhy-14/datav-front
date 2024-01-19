<template>
  <div class="chart-page">
    <div class="chart-header">
      <div class="chart-header-left-icon">
        <h2>创建图表</h2>
      </div>
      <div class="chart-header-left-button">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
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
            </div>
          </div>

          <div class="create-chart-view-right">
            <div class="chart-select">
              <el-popover
                @click="changeChart('line')"
                placement="top-start"
                title="Title"
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
                title="Title"
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
                title="Title"
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
                title="Title"
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

            </div>
            <div class="chart-view">
              <Bar v-if="chartType == 'bar'"></Bar>
              <Line v-if="chartType == 'line'"></Line>
              <Pie v-if="chartType == 'pie'"></Pie>
              <Scatter v-if="chartType == 'scatter'"></Scatter>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Bar from "@/components/chart/Bar.vue";
import BarConfig from "@/components/chart/BarConfig.vue";
import Line from "@/components/chart/Line.vue";
import LineConfig from "@/components/chart/LineConfig.vue";
import Pie from "@/components/chart/Pie.vue";
import PieConfig from "@/components/chart/PieConfig.vue";
import Scatter from "@/components/chart/Scatter.vue";
import ScatterConfig from "@/components/chart/ScatterConfig.vue";
import { myDatasetApi, getDatasetApi } from "@/api/table/index.ts";
import { useChartStore } from "@/store/chart.ts";

export default {
  components: {
    Bar,
    BarConfig,
    Pie,
    PieConfig,
    Line,
    LineConfig,
    Scatter,
    ScatterConfig
  },
  data() {
    return {
      myDataset: [],
      currentDataset: {},
      selectDataset: "请选择数据集",
      currentDatasetName: "请选择数据集",
      chartStore: null,
      chartType: "bar"
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
    }
  },
  watch: {
    selectDataset(newVal, oldVal) {
      getDatasetApi(this.selectDataset).then(res => {
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