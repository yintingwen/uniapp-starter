// 获取团队信息
export const getInfo = () => http.get('/teams')
// 获取下级用户列表
export const getSubordinateUserList = () => http.get('/teamSales')
// 获取下级佣金明细
export const getSubordinateCommissionDetail = (params) => http.get('teamprofit', { params })
// 获取默认点位列表
export const getTariffDefaultList = () => http.post('/getTax')
// 获取下级点位列表
export const getTariffSubordinateList = (data) => http.post('/getDownTax', data)
// 设置默认点位
export const setTariffDefault = (data) => http.post('/setDefaultTax', data)
// 设置下级点位
export const setTariffSubordinate = (data) => http.post('/setDownTax', data)
// 注册下级用户
export const registerSubordinateUser = (data) => http.post('/createDownSale', data)