<script setup>
const props = defineProps({
  show: { type: Boolean, default: false }
})

const emits = defineEmits(['close'])

function onTapWxCode() {
  uni.previewImage({
    urls: ['https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/common/wx_code.png']
  })
}

function onTapCall() {
  uni.makePhoneCall({ phoneNumber: '18970047460' })
}
</script>

<template>
  <u-popup :show="show" mode="center" :round="20" :safeAreaInsetBottom="false" @close="emits('close')">
    <view class="wx-code-popup flex-center-col">
      <image
        @tap="onTapWxCode"
        class="code"
        src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/common/wx_code.png"
        mode="widthFix"
      />
      <view class="wechat-title">扫码添加客服</view>
      <view class="phone">客服电话：18970047460</view>
      <button class="btn" @tap="onTapCall">立即拨打</button>
    </view>
  </u-popup>
</template>

<style lang="scss">
.wx-code-popup {
  padding: 50rpx;
  width: 400rpx;

  .code {
    width: 300rpx;
    margin-bottom: 0rpx;
  }

  .wechat-title {
    color: #acacac;
    font-size: 24rpx;
  }

  .phone {
    padding: 10rpx 0;
    font-size: 30rpx;
  }

  .btn {
    background-color: $uni-color-primary;
    font-size: 24rpx;
    color: #fff;
    padding: 20rpx;
    width: 340rpx;
  }

  view {
    line-height: 1.5;
  }
}
</style>
