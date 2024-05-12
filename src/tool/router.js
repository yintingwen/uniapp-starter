const routerMethods = [
  {
    name: 'navigateTo',
    method: uni.navigateTo
  },
  {
    name: 'redirectTo',
    method: uni.redirectTo
  },
  {
    name: 'reLaunch',
    method: uni.reLaunch
  }
]
/**
 * @type { import('../types/router').Router }
 */
export class Router {
  constructor() {
    routerMethods.forEach((item) => {
      this[item.name] = (url, params = {}, options = {}) => {
        console.log(params);
        return this.callRouterMethod(item.method, this.formatOptions(url, params, options))
      }
    })
  }

  navigateBack(delta, options = {}) {
    const useOptions = typeof delta === 'number' ? { ...options, delta } : delta
    return uni.navigateBack(useOptions)
  }

  switchTab(url, options = {}) {
    return this.callRouterMethod(uni.switchTab, this.formatOptions(url, undefined, options))
  }

  formatOptions(url, params, options) {
    const useOptions = typeof url === 'string' ? { ...options, url } : url
    const useParams = typeof url === 'string' ? params : useOptions.params
    useOptions.url = qs.stringifyUrl({ url: useOptions.url, query: useParams || {} })
    return useOptions
  }

  callRouterMethod(method, options) {
    // 当前所在页
    const current = getCurrentPages()[getCurrentPages().length - 1]
    if (current && options.url === `/${current.route}`) return
    return method.call(uni, options)
  }
}

export default new Router()
