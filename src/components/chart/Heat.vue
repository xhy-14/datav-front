<template>
  <div id="main"></div>
</template>

<script lang="ts">
import { HeatApi } from "@/api/chart/chart";
import * as echarts from "echarts";
import { useChartStore } from "@/store/chart";
export default {
  data() {
    return {
      parameter: {
        headers: ["单价", "数量", "测试"],
        rows: [
          {
            单价: 100,
            数量: 10,
            测试: 100
          },
          {
            单价: 100,
            数量: 10,
            测试: 100
          },
          {
            单价: 100,
            数量: 10,
            测试: 100
          }
        ]
      },
      chartStore: null,
      bar: null
    };
  },
  created() {
    this.chartStore = useChartStore();
  },
  mounted() {
    this.bar = echarts.init(document.getElementById("main"))
    this.drawLine();
  },
  methods: {
    async drawLine() {
      let options = null;
      // 获取图表数据
      await HeatApi(this.parameter)
        .then(result => {
          options = result.data;
          console.log(options);
        })
        .catch(err => { });
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      this.chartStore.setOptions(options)
    }
  },
  watch: {
    "chartStore.options": {
      handler(newVal, oldVal) {
        this.bar.setOption(newVal)
      },
      deep: true
    }
  }
};
</script>

<style>
#main {
  width: 100%;
  height: 100%;
}
</style>