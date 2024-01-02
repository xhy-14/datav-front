// 示例
import { defineStore } from "pinia"

export const useStore = defineStore("store", {
  // 存储位置
  state: () => {
    return {
      counter: 0
    }
  },
  // 数据操作
  actions: {
    increment() {
      this.counter++
    }
  },
  // 数据读取
  getters: {
    doubleCount: (state) => state.counter * 2
  }
})