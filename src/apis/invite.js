const http = uni.$u.http

export class InviteApi {
  // 获取新人奖励
  static getNewcomerReward = () => http.get('/invite/showNewcomerReward')
  // 领取新人奖励
  static receiveNewcomerReward = () => http.get('/invite/getNewcomerReward')
}
