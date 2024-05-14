<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
})

const emits = defineEmits(['close'])

function onTapWxCode() {
  uni.previewImage({
    urls: ['https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/common/wx_code.png'],
  })
}
</script>

<template>
  <u-popup
    :show="show"
    mode="center"
    :round="20"
    :safeAreaInsetBottom="false"
    @close="emits('close')"
  >
    <view class="wx-code-popup flex-center-col">
      <image
        @tap="onTapWxCode"
        class="code"
        src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/common/wx_code.png"
        mode="widthFix"
      />
      <view>点击打开二维码后，长按扫码</view>
      <view>添加企业微信，领取票点</view>
    </view>
  </u-popup>
</template>

<style lang="scss">
.wx-code-popup {
  padding: 50rpx;

  .code {
    width: 300rpx;
    margin-bottom: 20rpx;
  }

  view {
    line-height: 1.5;
  }
}
</style>
