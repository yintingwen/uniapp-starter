import { defineStore } from 'pinia'
import { USER_TOKEN_STORAGE, USER_INFO_STORAGE } from '@/constants/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: uni.getStorageSync(USER_INFO_STORAGE) || {},
    userToken: uni.getStorageSync(USER_TOKEN_STORAGE) || null
  }),
  getters: {
    isLogin: (state) => !!state.userToken
  },
  actions: {
    // 用户登录
    async login(data) {
      // const token = await UserApi.login(data)
      // this.userToken = token
      // uni.setStorageSync(USER_TOKEN_STORAGE, token)
      // await this.getUserBaseInfo()
    },
    // 登出
    async logout(timeout = false) {
      // if (!timeout) {
      //   await UserApi.logout()
      // }
      // this.userToken = null
      // this.userInfo = {}
      // uni.removeStorageSync(USER_TOKEN_STORAGE)
      // uni.removeStorageSync(USER_INFO_STORAGE)
    },

    // 获取用户一系列的信息
    async getUserBaseInfo() {
      // await Promise.all([this.getUserInfo()])
    },
    // 获取用户信息
    async getUserInfo() {
      // const info = await UserApi.getUserInfo()
      // this.userInfo = info
      // uni.setStorageSync(USER_INFO_STORAGE, info)
    }
  }
})
