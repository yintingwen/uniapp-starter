<template>
  <view
    :class="['custom-page', fillType === coPageFillTypeEnum.BODY ? 'custom-page-fill' : '']"
    :style="pageStyle"
  >
    <u-navbar
      v-if="navbar"
      :bgColor="navbarBgColor"
      :bgImage="navbarBgImage"
      :title="navbarTitle"
      :titleStyle="{ color: navbarTitleColor }"
      :leftIconColor="navbarTitleColor"
      :rightIconColor="navbarTitleColor"
      :autoBack="navbarBack"
      :placeholder="true"
      :leftIcon="navbarLeftIcon || (navbarBack ? 'arrow-left' : '')"
      :rightText="navbarRightText"
      :rightIcon="navbarRightIcon"
      leftIconSize="40rpx"
      rightIconSize="40rpx"
      @rightClick="emits('navbarRightTap')"
    ></u-navbar>
    <view :class="['custom-page-body']" :style="bodyStyle">
      <slot></slot>
      <u-safe-bottom v-if="!isTabPage && safeBottom"></u-safe-bottom>
    </view>
  </view>
</template>

<script setup name="co-page">
import { defineProps } from 'vue'

const props = defineProps({
  // 头部自定义导航栏
  navbar: { type: Boolean, default: pageConfig.navbar }, // 是否开启自定义导航栏
  navbarTitle: { type: String, default: '' }, // 导航栏文字
  navbarTitleColor: { type: String, default: pageConfig.navbarTitleColor }, // 导航栏文字颜色
  navbarBgColor: { type: String, default: pageConfig.navbarBgColor }, // 导航栏背景色
  navbarBgImage: { type: String, default: pageConfig.navbarBgImage }, // 导航栏背图
  navbarLeftIcon: { type: String, default: pageConfig.navbarLeftIcon }, // 右侧图标
  navbarRightText: { type: String, defaule: pageConfig.navbarRightText }, // 右侧文字
  navbarRightIcon: { type: String, default: pageConfig.navbarRightIcon }, // 右侧图标
  // 其他配置
  isTabPage: { type: Boolean, default: false }, // 是否是tab页
  safeBottom: { type: Boolean, default: true }, // 是否显示安全区域
  fillType: { type: Number, default: pageConfig.fillType || coPageFillTypeEnum.NONE }, // 页面填充类型
  bgColor: { type: String, default: pageConfig.bgColor }, // 内容背景颜色
  bgImage: { type: String, default: pageConfig.bgImage }, // 内容背景图片
  checkLogin: { type: Boolean }, // 是否校验登录
})

let isLoad = false
const currentPagePath = `/${getCurrentPages().slice(-1)[0].route}`
const currentPageConfig = pageConfig?.pages?.[currentPagePath] || pageConfig

const useCheckLogin = computed(() => {
  if (props.checkLogin !== undefined) return props.checkLogin
  if (currentPageConfig?.checkLogin !== undefined) return currentPageConfig.checkLogin
  if (pageConfig?.checkLogin !== undefined) return pageConfig.checkLogin
  return false
})

const pageStyle = computed(() => {
  const style = {}
  if (props.fillType !== coPageFillTypeEnum.NONE) {
    style[coPageFillTypeStyleEnum[props.fillType]] = `100%`
  }
  return style
})

const bodyStyle = computed(() => {
  const style = {}
  if (props.bgColor) {
    style['backgroundColor'] = props.bgColor
  }
  return style
})

function authToLogin() {
  const userStore = useUserStore()
  if (!currentPageConfig.checkLogin || userStore.isLogin) return
  uni.$router.navigateTo('/pages/login/login')
}

onLoad(() => {
  useCheckLogin.value && authToLogin()
})

onHide(() => {
  isLoad = true
})

useCheckLogin.value && props.isTabPage &&
  onTabItemTap((e) => {
    if (!isLoad) return
    authToLogin()
  })
</script>

<style lang="scss" scoped>
.custom-page-fill {
  display: flex;
  flex-direction: column;

  .custom-page-body {
    flex: 1;
    overflow: hidden;
  }
}

.custom-page {
  width: 100%;

  .custom-page-header {
    .custom-page-header-container {
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
    }
  }
}
</style>
