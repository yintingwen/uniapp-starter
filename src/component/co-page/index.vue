<template>
  <view
    :class="['custom-page', fillType === coPageFillTypeEnum.body ? 'custom-page-fill' : '']"
    :style="coPageStyle"
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
    <view :class="['custom-page-body']">
      <slot></slot>
    </view>
    <u-safe-bottom v-if="!isTabPage && safeBottom"></u-safe-bottom>
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
  fillType: { type: Number, default: pageConfig.fillType || coPageFillTypeEnum.none }, // 页面填充类型
  bgColor: { type: String, default: pageConfig.bgColor }, // 页面背景颜色，整个page覆盖区域
  checkLogin: { type: Boolean, default: true }, // 是否校验登录
})

const coPageStyle = computed(() => {
  const style = {}
  if (props.bgColor) {
    style['backgroundColor'] = props.bgColor
  }
  if (props.fillType !== coPageFillTypeEnum.none) {
    style[coPageFillTypeStyleEnum[props.fillType]] = `100%`
  }
  return style
})

props.checkLogin && useAuthPageCheckLogin(props.isTabPage)
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
