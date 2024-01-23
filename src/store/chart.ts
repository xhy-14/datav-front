// 示例
import { defineStore } from "pinia"

export const useChartStore = defineStore("chart", {
  // 存储位置
  state: () => {
    return {
      chart: {
        info: {},
      },
      options: null,
      data: null,
      parameter: null
    }
  },
  // 数据操作
  actions: {
    setChartInfo(info: any) {
      this.chartInfo.info = info
    },
    setOptions(options: any) {
      this.options = options
    },
    saveData(data: any) {
      this.data = data
    },
    setParameter(parameter: any){
      this.parameter = parameter
    }
  },
  // 数据读取
  getters: {
    chartInfo: (state) => state.chart,
    getOption: (state) => {
      return state.options
    },
    getData: (state) => {
      return state.data
    },
    getParameter: (state) => {
      return state.parameter
  }
  }
})
