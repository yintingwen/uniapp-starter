const http = uni.$u.http

http.setConfig(() => {
  return {
    baseURL: import.meta.env.VITE_HTTP_URL
  }
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

// 响应拦截
http.interceptors.response.use(
  (response) => {
    const { data: res, statusCode } = response
    // http:502 服务器崩了
    if (statusCode === 502) {
      uni.showToast({ title: res.message || '服务器或网络异常', icon: 'error' })
    }
    if (res.code === 0) return res.data
    return Promise.reject(createError(res.message, res.code))
  },
  (error) => {
    const { data = {} } = error
    uni.showToast({
      title: data.message || error.message || '网络异常',
      icon: 'error'
    })
    return Promise.reject(error)
  }
)

/**
 * 创建错误
 * @param {*} message 错误信息
 * @param {*} code 错误码
 * @returns 
 */
function createError(message, code) {
  const error = new Error(message)
  error.code = code
  return error
}