export class UniUtil {
  /**
   * 展示提示框
   * @param {UniNamespace.ShowModalOptions} options
   */
  static async showModal(options) {
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
  static async showModalConfirm(options) {
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
  static getStorageSync(key, defaultValue) {
    if (!key) return defaultValue
    const value = uni.getStorageSync(key)
    return value === '' ? defaultValue : value
  }

  /**
   * 唤起支付
   * @param {UniNamespace.RequestPaymentOptions} e 
   */
  static async requestPayment(e) {
    const res = await uni.requestPayment(e)
    console.log(res);
    if (res.errMsg !== 'requestPayment:ok') {
      console.log('?支付失败');
      throw new Error(res.errMsg)
    }
  }
}
