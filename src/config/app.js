export const appConfig = defineAppConfig({
  // co-page统一配置
  page: {
    navbar: false,
    navbarTitleColor: '#efd780',
    navbarBgImage: 'linear-gradient(to right, #333, #000)',
    fillType: coPageFillTypeEnum.page
  },
  page: {
    
    bgColor: '#000',
    textColor: '#fff'
  },
  permission: {
    checkLogin: true,
    excludes: ['pages/register/register', 'pages/login/login']
  }
})