// co-page统一配置
/**
 * @type { import('../types/config/page.ts').PageConfig }
 */
export const pageConfig = {
  // navbar: true,
  // navbarTitleColor: '#efd780',
  // navbarBgImage: 'linear-gradient(to right, #333, #000)',
  // fillType: coPageFillTypeEnum.BODY
  checkLogin: false,
  pages: {
    "/pages/index/index": {
      checkLogin: false
    }
  }
}
