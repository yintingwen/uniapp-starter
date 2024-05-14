// 充值
export const recharge = (data) => http.post('/appleCharge', data)
// 充值记录列表
export const rechargeRecordList = (data) => http.post('/chargeList', data)
// 提现
export const withdrawal = (data) => http.post('/appleWithdrawal', data)
// 提现记录列表
export const withdrawalRecordList = (data) => http.post('/withdrawalList', data)
// 收款方式类型列表
export const getCollectionTypeList = () => http.post('/nodes')
// 收款方式列表
export const getCollectionList = (data) => http.post('/users', data)
// 添加收款方式 银行卡
export const addCollectionBank = (data) => http.post('/adduser', data)
// 添加收款方式 二维码
export const addCollectionCode = (data) =>
  http.upload('/adduser', {
    name: 'qrcode',
    filePath: data.qrcode,
    formData: { ...data }
  })
// 编辑收款方式 银行卡
export const editCollectionBank = (data) => http.post('/edituser', data)
// 编辑首款方式 二维码
export const editCollectionCode = (data) =>
  http.upload('/edituser', {
    name: 'qrcode',
    filePath: data.qrcode,
    formData: { ...data }
  })
// 删除收款方式
export const delCollection = (user_id) => http.post('/deluser', { user_id })
// 获取提现地址
export const getWithdrawalAddress = () => http.post('/getWithdrawalAddress')
// 修改提现地址
export const editWithdrawalAddress = (data) => http.post('/editWithdrawalAddress', data)
// 获取资产信息
export const getAssetInfo = (data) => http.post('/assets', data)
