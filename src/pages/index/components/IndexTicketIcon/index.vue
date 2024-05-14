<script setup>
const userStore = useUserStore()

function onTapIcon () {
  uni.$router.navigateTo('/pages/ticket-detail/ticket-detail')
}
</script>

<template>
  <view class='index-ticket-icon flex-center' @tap="onTapIcon">
    <view class="label">票</view>
    <view>{{ userStore.ticketBalance }}</view>
  </view>
</template>

<style lang='scss' scoped>
.index-ticket-icon {
  position: absolute;
  right: 20rpx;
  bottom: 120rpx;
  width: 90rpx;
  height: 90rpx;
  border-radius: 10rpx;
  background-color: #fff;
  flex-direction: column;
  font-size: 24rpx;

  .label {
    padding: 2rpx 6rpx;
    border-radius: 4rpx;
    background: #ffcd44;
    color: #fff;
    margin-bottom: 4rpx;
  }
}
</style>