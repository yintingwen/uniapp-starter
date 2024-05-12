<template>
  <view :class="['custom-page', pageFill ? 'custom-page-fill' : '']" :style="pageStyle">
    <view class="custom-page-header" v-if="customHeader">
      <view class="custom-page-header-container">
        <u-status-bar></u-status-bar>
        <view class="costom-page-header-nav" :style="{ height: navHeight + 'px' }">
          <slot name="navigation">{{ navText }}</slot>
        </view>
      </view>
      <view class="custom-page-header-placeholder">
        <u-status-bar></u-status-bar>
        <view :style="{ height: navHeight + 'px' }"></view>
      </view>
    </view>
    <view :class="['custom-page-body']" :style="style">
      <slot></slot>
    </view>
    <u-safe-bottom v-if="!isTabPage && safeBottom"></u-safe-bottom>
  </view>
</template>

<script setup name="co-page">
import { defineProps } from 'vue'

const props = defineProps({
  isTabPage: { type: Boolean, default: false }, // 是否是tab页
  checkLogin: { type: Boolean, default: true }, // 是否校验登录
  customHeader: { type: Boolean, default: false }, // 是否自定义头部
  navHeight: { type: Number, default: 44 }, // 导航栏高度
  navText: { type: String, default: '' }, // 导航栏文字
  style: { type: [String, Object], default: '' }, // body样式
  pageStyle: { type: [String, Object], default: '' }, // page样式
  pageFill: { type: Boolean, default: false }, // 页面填充方式
  safeBottom: { type: Boolean, default: true } // 是否显示安全区域
})

props.checkLogin && useAuthPageCheckLogin(props.isTabPage)
</script>

<style lang="scss" scoped>
.custom-page-fill {
  display: flex;
  flex-direction: column;
  height: 100%;

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
