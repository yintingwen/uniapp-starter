<script setup>
import { CAR_PROVINCE_LISE } from '@constants/car'
const emits = defineEmits(['tapKey'])
</script>

<template>
  <view class="co-keyboard-car-province">
    <view class="item flex-center" v-for="item in CAR_PROVINCE_LISE" :key="item">
      <view
        class="item-text flex-center keyword-btn"
        hover-class="co-hover-class"
        :hover-stay-time="200"
        @tap="emits('tapKey', item)"
        >{{ item }}</view
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
.co-keyboard-car-province {
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx 0 10rpx 10rpx;

  .item {
    height: 90rpx;
    width: 90rpx;

    .item-text {
      border-radius: 10rpx;
      height: 70rpx;
      width: 70rpx;
      font-weight: 700;
      line-height: 1;
      background-color: #fff;
    }
  }
}

.co-hover-class {
  background-color: #e5e7eb !important;
}
</style>
