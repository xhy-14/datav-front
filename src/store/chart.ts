// 示例
import { defineStore } from "pinia"

export const useChartStore = defineStore("chart", {
  // 存储位置
  state: () => {
    return {
        chart: {
            info:{}
        }
    }
  },
  // 数据操作
  actions: {
    setChartInfo( info:any ){
      this.chartInfo.info =  info
    }
  },
  // 数据读取
  getters: {
    chartInfo: (state) => state.chart,
  },
})