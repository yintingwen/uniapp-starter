import { onHide } from '@dcloudio/uni-app'

export function useAuthPageCheckLogin(isTabPage) {
  let isLoad = false

  function authToLogin(path) {
    const userStore = useUserStore()
    if (permissionConfig.includes(path) || userStore.isLogin) return
    uni.$router.navigateTo('/pages/login/login')
  }

  onLoad(() => {
    authToLogin(getCurrentPages().slice(-1)[0].route)
  })

  onHide(() => {
    isLoad = true
  })

  isTabPage &&
    onTabItemTap((e) => {
      if (!isLoad) return
      authToLogin(e.pagePath)
    })
}
