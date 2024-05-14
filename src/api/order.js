// 获取接单信息
export const getInfo = () => http.get('/matchInfo')
// 获取订单详情
export const getOrderDetail = (params) => http.get('/getOrder', { params })
// 兑换匹配金额
export const exchangeAmount = (data) => http.post('/balanceToMatch', data)
// 兑换记录
export const exchangeRecord = (params) => http.get('/balanceMatchs', { params })
// 开启或者关闭接单
export const setOpen = (params) => http.get('/setopen', { params })
// 获取订单列表
export const getRecordList = (data) => http.post('/getorderlist', data)
// 抢单
export const grab = (data) => http.post('/grab', data)
// 确认收款
export const comfirePay = (params) => http.get('/comfirePay', { params })
// 赎回余额
export const redemptionBalance = (data) => http.post('/redemptionBalance', data)
// 余额变动记录
export const balanceRecord = (params) => http.get('/orderBalanceChargeList', { params })