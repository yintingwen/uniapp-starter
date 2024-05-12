export function useSmsCode(service, options = {}) {
  // 页面
  const page = getCurrentPages().pop().route

  const { interval, key, appendKey } = options
  const sms = reactive({
    loading: false,
    interval: 0
  })
  const now = Date.now()
  const cacheTimeout = uni.getStorageSync(getStorageKey())

  if (cacheTimeout && cacheTimeout >= now) {
    sms.interval = Math.floor((cacheTimeout - now) / 1000)
    startCountdown()
  }
  let timer = undefined

  onUnload(() => clearInterval(timer))

  function startCountdown() {
    timer = setInterval(() => {
      sms.interval -= 1
      if (sms.interval) return
      clearInterval(timer)
    }, 1000)
  }

  async function run(params) {
    if (sms.loading || sms.interval) return
    sms.loading = true
    try {
      await service(params)
      sms.interval = interval
      uni.setStorage({
        key: getStorageKey(),
        data: Date.now() + interval * 1000
      })
      startCountdown()
    } finally {
      sms.loading = false
    }
  }

  function getStorageKey ( ) {
    return key || `SMS_CODE_TIMEOUT_${page}${appendKey ? '_' + appendKey : ''}`
  }

  return {
    run,
    sms
  }
}
