/**
 * 校验用户登录状态，未登录跳转到登录页，会返回boolean
 */
export function checkLogin() {
  const userStore = useUserStore()
  if (!userStore.isLogin) {
    routerHelper.jumpToLogin()
  }
  return userStore.isLogin
}

/**
 * 检验用户登录状态，未登录跳转到登录页，并丢出异常强制中断，用来方便的中断后续请求
 */
export function checkLoginThrowError() {
  const userStore = useUserStore()
  if (userStore.isLogin) return
  routerHelper.jumpToLogin()
  throw new Error('请先登录')
}

/**
 * token过期，清除用户信息，跳转到登录页
 */
export function tokenTimeout() {
  const userStore = useUserStore()
  uni.showToast({ title: '登录已过期', icon: 'error' })
  userStore.logout(true)
  routerHelper.jumpToLogin()
}
