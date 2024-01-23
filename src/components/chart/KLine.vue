<template>
  <div id="main"></div>
</template>

<script lang="ts">
import { kLineApi } from "@/api/chart/chart";
import * as echarts from "echarts";
import { useChartStore } from "@/store/chart";
export default {
  data() {
    return {
      parameter: {
        headers: ["日期", "开盘价", "最高价", "最低价", "收盘价"],
        rows: [
          {
            最低价: 90,
            日期: 1.1,
            最高价: 50,
            开盘价: 100,
            收盘价: 60
          },
          {
            最低价: 98,
            日期: 1.2,
            最高价: 115,
            开盘价: 106,
            收盘价: 108
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
    this.bar = echarts.init(document.getElementById("main"));
    this.drawLine();
  },
  methods: {
    async drawLine() {
      let options = null;
      // 获取图表数据
      await kLineApi(this.parameter)
        .then(result => {
          options = result.data;
        })
        .catch(err => { });
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      this.chartStore.setOptions(options);
    }
  },
  watch: {
    "chartStore.options": {
      handler(newVal, oldVal) {
        console.log(newVal);
        this.bar.setOption(newVal);
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