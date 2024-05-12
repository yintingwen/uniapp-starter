import { defineStore } from "pinia";

export const useSystemStore = defineStore('system',{
  state: () => ({
    systemInfo: null
  }),
  computed: {
    devicePixelRatio (state) {
      return state.systemInfo.devicePixelRatio 
    }
  },
  actions: {
    getSystemInfo () {
        this.systemInfo = uni.getSystemInfoSync()
    }
  }
})