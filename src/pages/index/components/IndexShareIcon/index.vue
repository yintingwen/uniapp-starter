<script setup>
</script>

<template>
  <button class='index-ticket-icon flex-center' open-type="share">
    <co-icon name="fenxiang" class="label" :size="44"/>
    <view class="text">分享</view>
  </button>
</template>

<style lang='scss' scoped>
.index-ticket-icon {
  position: absolute;
  right: 20rpx;
  bottom: 220rpx;
  width: 90rpx;
  height: 90rpx;
  border-radius: 10rpx;
  background-color: #fff;
  flex-direction: column;
  font-size: 22rpx;

  .label {
    color: $uni-color-primary;
    margin-bottom: 6rpx;
  }
}
</style>