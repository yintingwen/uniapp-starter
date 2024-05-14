import { defineStore } from "pinia";

export const useSystemStore = defineStore('system',{
  state: () => ({
    systemInfo: uni.getSystemInfoSync(),
    dataSource: dataSourceEnum.XMYX
  }),
  getters: {
    devicePixelRatio (state) {
      return state.systemInfo.devicePixelRatio 
    }
  }
})