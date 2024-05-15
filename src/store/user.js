import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 用户信息
    userInfo: uni.getStorageSync(USER_INFO_STORAGE) || {},
    // 用户token
    userToken: uni.getStorageSync(USER_TOKEN_STORAGE) || null,
    // 用户权益
    beneficial: {
      rechargeTicketBalance: 0, // 充值票余额
      freeTicketBalance: 0 // 免费票余额
    },
    // 用户授权车辆
    authVehicle: [],
    // 是否展示新人奖励
    showNewcomerReward: false,
    // 注册的天数（从0开始）
    registerDays: -1,
    // 新人奖励
    newcomerReward: [
      {"rewardNum": 3, "rewardType": 2, "rewardStatus": 0}, 
      {"rewardNum": 3, "rewardType": 2, "rewardStatus": 0}, 
      {"rewardNum": 3, "rewardType": 2, "rewardStatus": 0}, 
      {"rewardNum": 3, "rewardType": 2, "rewardStatus": 0}, 
      {"rewardNum": 3, "rewardType": 2, "rewardStatus": 0}, 
      {"rewardNum": 3, "rewardType": 2, "rewardStatus": 0}, 
      {"rewardNum": 3, "rewardType": 2, "rewardStatus": 0}
    ]
  }),
  getters: {
    // 是否登录
    isLogin: (state) => !!state.userToken,
    // 用户昵称
    userNickName: (state) => state.userInfo?.mobile?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    // 是否实名认证
    isReal: (state) => !!(state.userInfo?.idCardNo && state.userInfo?.name),
    // 是否网格实名认证
    gridReal: (state) => !!state.userInfo?.zjxlSpeedUserId,
    // 是否精准实名认证
    preciseReal: (state) => !!state.userInfo?.zjxlAccurateUserId,
    // 剩余票点
    ticketBalance: (state) =>
      state.beneficial.rechargeTicketBalance + state.beneficial.freeTicketBalance,
    // 充值票余额
    ticketBalanceRecharge: (state) => state.beneficial.rechargeTicketBalance || 0,
    // 赠送票余额
    ticketBalanceFree: (state) => state.beneficial.freeTicketBalance || 0,
    // 网格preid
    gridPreId: (state) => state.userInfo?.zjxlSpeedUserId,
    // 精准preid
    precisePreId: (state) => state.userInfo?.zjxlAccurateUserId,
  },
  actions: {
    // 用户登录
    async login(data) {
      const token = await userApi.login(data)
      this.userToken = token
      uni.setStorageSync(USER_TOKEN_STORAGE, token)
      await this.getUserBaseInfo()
    },
    // 登出
    async logout(timeout = false) {
      if (!timeout) {
        await userApi.logout()
      }
      this.userToken = null
      this.userInfo = {}
      uni.removeStorageSync(USER_TOKEN_STORAGE)
      uni.removeStorageSync(USER_INFO_STORAGE)
    },
    // 更新preid，0：网格，1：精准
    async updateUserPreid(preid, type) {
      if (type) {
        await userApi.updateZjxlPreId({ zjxlAccurateUserId: preid })
      } else {
        await userApi.updateZjxlPreId({ zjxlSpeedUserId: preid })
        uni.removeStorageSync('ZJXL_GRID_AUTH_STORAGE')
      }
      await this.getUserInfo()
    },
    // 获取用户一系列的信息
    async getUserBaseInfo() {
      await Promise.all([this.getUserInfo(), this.getBeneficial(), this.getUserAuthVehicle()])
    },
    // 获取用户信息
    async getUserInfo() {
      const info = await userApi.getUserInfo()
      this.userInfo = info
      uni.setStorageSync(USER_INFO_STORAGE, info)
      this.getNewcomerReward()
    },
    // 获取用户权益
    async getBeneficial() {
      this.beneficial = await userApi.getUserBeneficial()
    },
    // 获取用户授权车辆
    async getUserAuthVehicle() {
      this.authVehicle = await userApi.getAuthVehicle()
    },
    // 获取新人奖励
    async getNewcomerReward() {
      const nr = await inviteApi.getNewcomerReward()
      this.newcomerReward = [nr.day1, nr.day2, nr.day3, nr.day4, nr.day5, nr.day6, nr.day7]
      const registerTime = dayjs(this.userInfo.createTime).endOf('day')
      const today = dayjs().endOf('day')
      this.registerDays = today.diff(registerTime, 'day')
      this.showNewcomerReward = this.registerDays < 7 && (this.newcomerReward[this.registerDays].rewardStatus === 0)
    }
  }
})
