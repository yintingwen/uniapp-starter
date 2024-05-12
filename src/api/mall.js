const http = uni.$u.http

export class MallApi {
  // 获取充值列表
  static getRechargeMallList = () => http.get('/rechargeMall/getRechargeMallInfo')
  // 统一支付接口
  static pay = (params) => http.get('/rechargeMall/rechargeMallUnifiedPay', { params })
  // 订单状态查询接口
  static queryOrderStatus = (params) => http.get('/rechargeMall/orderQuery', { params })
  // 退款
  static refund = (params) => http.get('/rechargeMall/refund', { params })
}
