const routerMethods = ['navigateTo', 'redirectTo', 'reLaunch', 'swichTab']

class UseRouter {
  constructor() {
    routerMethods.forEach((method) => {
      this[method] = (url, params) => {
        // 跳转的url
        const useUrl = typeof url === 'string' ? url : url.url
        // 跳转的参数
        const useParams = typeof url === 'string' ? params : url.data
        // 当前所在页
        const current = getCurrentPages()[getCurrentPages().length - 1]
        if (current && useUrl === `/${current.route}`) return
        UserHelper.checkLoginThrowError()
        uni[method]({ url: useUrl + this.dataToString(useParams) })
      }
    })
  }

  navigateBack(delta = 1) {
    uni.navigateBack({
      delta
    })
  }

  getFullPath(url, params) {
    return url + this.dataToString(params)
  }

  dataToString(data = {}) {
    let str = ''
    Object.keys(data).forEach((key) => {
      str += `${key}=${encodeURIComponent(data[key])}&`
    })
    return str ? `?${str}` : ''
  }
}

uni.$router = new UseRouter()
