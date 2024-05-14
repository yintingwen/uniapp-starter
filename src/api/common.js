export const getAppConfig = () => http.get('/getConfig')

export const sendSmsCode = (params) => http.get('/sendCode', { params })