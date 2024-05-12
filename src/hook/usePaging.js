/**
 *
 * @param {import("../types/useRequest").UseRequestService} service
 * @param {import("../types/useRequest").UseRequestOptions} options
 * @returns {import("../types/useRequest").UseRequestResult}
 */
export default function usePaging(service, options) {
  if (typeof service !== 'function') {
    throw new Error('useRequest 的第一个参数必须是函数')
  }
  options = normalizeOptions(options)

  const params = ref(options.defaultParams) // 当前请求参数
  const data = ref(UniUtil.getStorageSync(options.storageKey, options.defaultData)) // 当前请求结果
  const loading = ref(false) // 当前请求状态

  async function run(p) {
    loading.value = true
    const start = Date.now()
    // 更新当前使用的参数，如果传入了参数，那么使用传入的参数，否则使用默认参数
    params.value = p !== undefined ? [p] : options.defaultParams
    const res = await service.apply(null, params.value)
    // 如果设置了 loadingDelay，那么会在 loadingDelay 时间后才会设置 loading 为 false
    if (options.loadingDelay) {
      // 计算请求时间
      const delta = Date.now() - start
      // 如果请求时间小于 loadingDelay，那么会延迟 loadingDelay - delta 时间后才会设置 loading 为 false
      if (delta < options.loadingDelay) {
        await delay(options.loadingDelay - delta)
      }
    }
    if (options.storageKey) {
      uni.setStorage({ key: options.storageKey, data: res })
    }
    data.value = res
    loading.value = false
    return res
  }

  function refresh() {
    return run(...params.value)
  }

  if (!options.manual && !options.storageKey) {
    onLoad(() => run())
  }

  return {
    data,
    loading,
    params,
    run,
    refresh
  }
}

/**
 * 格式化参数
 * @param {import("../types/useRequest").UseRequestOptions} options
 * @returns
 */
function normalizeOptions(options) {
  options = options || {}

  options.manual = !!options.manual
  options.loadingDelay = options.loadingDelay || 0
  if (options.defaultParams !== undefined) {
    if (!Array.isArray(options.defaultParams)) {
      options.defaultParams = [options.defaultParams]
    }
  } else {
    options.defaultParams = []
  }

  return options
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function getDefaultData(storageKey, defaultData) {
  if (storageKey) {
    const data = uni.getStorageSync(storageKey)
    if (!data) {
      return data
    }
  }
  return defaultData
}
