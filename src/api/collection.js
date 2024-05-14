// 收款方式列表
export const getList = () => http.post('/users')
// 收款方式类型
export const getTypes = () => http.post('/nodes')
// 添加收款方式
export const addCollection = (data) => http.post('/adduser', data)
// 删除收款方式
export const delCollection = (user_id) => http.post('/deluser', { user_id })