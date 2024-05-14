// 注册
export const register = (data) => http.post('/regist', data)
// 登录
export const login = (data) => http.post('/login', data)
// 登出
export const logout = () => http.get('/logout')
// 修改密码
export const passwordChange = (data) => http.post('/changePassword', data)
// 修改昵称
export const nicknameChange = (data) => http.post('/changeNickname', data)
// 获取用户信息
export const getUserInfo = () => http.get('/userinfo')
// 绑定ws
export const bindWebsocket = (params) => http.get('/setFd', { params })
// 开启/关闭抢单
export const openGrabOrder = (open) => http.get('/setopen', { params: { open } })
// 抢单
export const grapOrder = (order_id) => http.post('/grab', { order_id })
// 确认收款
export const comfirePay = (order_id) => http.get('/comfirePay', { params: { order_id } })
// 团队列表
export const downsList = () => http.get('/downs')
