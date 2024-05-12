const http = uni.$u.http

export class UserApi {
  // 登录
  static login = (data) => http.post('/user/login', data)
  // 登出
  static logout = () => http.get('/user/logout')
  // 获取用户信息
  static getUserInfo = () => http.get('/user/getAppUserInfo')
  // 获取用户权益
  static getUserBeneficial = () => http.get('/benefit/getUserBenefitInfo')
  // 获取用户授权车辆
  static getAuthVehicle = () => http.get('/user/getUserAccurateAuthInfo')
  // 添加或更新用户车辆授权信息
  static addAuthVehicle = (data) => http.post('/user/addOrUpdateUserAccurateAuthInfo', data)
  // 用户搜索的车牌
  static getHistoryCarNo = (params) => http.get('/user/getHistoryCarNo', { params })
  // 更新preid
  static updateZjxlPreId = (params) => http.get('/user/updateZjxlUserId', { params })
  // 票点使用明细
  static ticketRecord = (data) => http.post('/benefit/ticketRecordQuery', data)
  // 充值记录
  static rechargeRecord = (data) => http.post('/benefit/rechargeRecord', data)
}
