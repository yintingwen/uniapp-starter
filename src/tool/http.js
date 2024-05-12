import Request from '@/uni_modules/uview-plus/libs/luch-request'

const http = new Request()

http.setConfig(() => {
  return {
    baseURL: import.meta.env.VITE_HTTP_HOST + import.meta.env.VITE_HTTP_PATH
  }
})

http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    config.header['Authorization'] = `Bearer ${userStore.userToken}`
    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

// 响应拦截
// token失效，刷新token，刷新成功继续请求，刷新失败进入登录
http.interceptors.response.use(
  (response) => {
    const { data: res, statusCode } = response

    // http:502 服务器崩了
    if (statusCode === 502) {
      uniUtil.hideLoading()
      uniUtil.showToast('服务器或网络异常')
      return Promise.reject(createError('服务器或网络异常'))
    }

    if (res.code === 0) return res.data
    uni.hideLoading()
    // token失效，并且不是刷新函数
    if (res.code === httpCodeEnum.T0KEN_INVALID) {
      uni.$u.debounce(userHelper.tokenInvite, 500)
    } else {
      uniUtil.showToast(res.message)
    }
    return Promise.reject(createError(res.message, res.code))
  },
  (error) => {
    uni.hideLoading()
    const { data = {} } = error
    uniUtil.showToast(data.message || error.message || '网络异常')
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

export default http
