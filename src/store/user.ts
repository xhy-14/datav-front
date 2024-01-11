// 示例
import { defineStore } from "pinia"


export const useUserStore = defineStore("user", {
  // 存储位置
  state: () => {
    return {
        user: {
                name: '',
                mobile: '', 
                token: '',
        }
    }
  },
  // 数据操作
  actions: {
    setUserInfo(name: string, mobile: string, token: string){
        this.userInfo.token = token
        this.userInfo.name = name
        this.userInfo.mobile = mobile
    }
  },
  // 数据读取
  getters: {
    userInfo: (state) => state.user,
  },
  persist: true,
})