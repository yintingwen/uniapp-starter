export interface AppConfig {
  navbar: AppNavbarConfig;
  page: AppPageConfig;
  permission: AppPermissionConfig;
}

export interface AppNavbarConfig {
  show: boolean;
  textColor: string;
  bgColor: string;
}

export interface AppPageConfig {
  bgColor: string;

  navbar: Boolean; // 是否开启自定义导航栏
  navbarTitle: String; // 导航栏文字
  navbarTitleColor: String; // 导航栏文字颜色
  navbarBgColor: String; // 导航栏背景色
  navbarBgImage: String; // 导航栏背图
  navbarLeftIcon: String; // 右侧图标
  navbarRightText: String; // 右侧文字
  navbarRightIcon: String; // 右侧图标
  fillType: typeof coPageFillTypeEnum; // 页面填充方式

}

export interface AppPermissionConfig {
  checkLogin: boolean,
  excludes: string[]
}