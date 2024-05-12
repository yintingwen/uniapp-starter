const systemInfo = uni.getSystemInfoSync()

export function showToast(title, icon = 'none', mask = false) {
  return uni.showToast({
    title,
    icon,
    mask
  })
}

export function showLoading(title = '加载中', mask = true) {
  return uni.showLoading({ title, mask })
}

export function hideLoading() {
  return uni.hideLoading()
}

/**
 * 展示提示框
 * @param {UniNamespace.ShowModalOptions} options
 */
export async function showModal(options) {
  options = typeof options === 'string' ? { content: options } : options
  options.title = options.title || '提示'
  const res = await uni.showModal(options)
  if (res.errMsg !== 'showModal:ok' || res.cancel) {
    throw new Error(res.errMsg)
  }
}

/**
 * 展示确认框
 * @param {UniNamespace.ShowModalOptions} options
 */
export async function showModalConfirm(options) {
  options = typeof options === 'string' ? { content: options } : options
  options.showCancel = false
  return UniUtil.showModal(options)
}

/**
 * 同步获取本地缓存，如果不存在则返回默认值
 * @param {*} key
 * @param {*} defaultValue
 * @returns
 */
export async function getStorageSync(key, defaultValue) {
  if (!key) return defaultValue
  const value = uni.getStorageSync(key)
  return value === '' ? defaultValue : value
}

/**
 * 唤起支付
 * @param {UniNamespace.RequestPaymentOptions} e
 */
export async function requestPayment(e) {
  const res = await uni.requestPayment(e)
  console.log(res)
  if (res.errMsg !== 'requestPayment:ok') {
    console.log('?支付失败')
    throw new Error(res.errMsg)
  }
}

export function rpx2px(num) {
  return (num / 750) * systemInfo.screenWidth
}

export function playAudio(src) {
  const innerAudioContext = uni.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = src
}
