// 示例
import { defineStore } from "pinia"

export let chartStore = defineStore("chart", {
  // 存储位置
  state: () => {
    return {
      options: null,
      data: null
    }
  },
  // 数据操作
  actions: {
    setOptions(options: any) {
      this.options = options
    },
    saveData(data: any) {
      this.data = data
    }
  },
  // 数据读取
  getters: {
    getOption: (state) => {
      return state.options
    },
    getData: (state) => {
      return state.data
    }
  }
})