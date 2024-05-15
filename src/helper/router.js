/**
 * 跳转登录页，避免重复
 */
export const jumpToLogin = () => {
  const pages = getCurrentPages()
  const nowPage = pages[pages.length - 1]
  // 如果当前页是登录页，不跳转
  if (nowPage.route === 'pages/login/login') return
  // 如果当前页不是登录页，但是wating为true，说明跳转中，不重复跳转
  if (jumpToLogin.wating) return
  // 如果当前页不是登录页，且wating为false，说明未跳转过，跳转到登录页，并且设置wating为true
  startJumpToLogin()
  uni.navigateTo({ url: '/pages/login/login' })
}

export function startJumpToLogin() {
  jumpToLogin.wating = true
}

export function endJumpToLogin() {
  jumpToLogin.wating = false
}
