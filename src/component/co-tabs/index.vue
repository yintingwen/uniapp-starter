<script setup>
defineProps({
  list: { type: Array, default: () => [] },
  active: { type: Number, default: 0 }
})

const emits = defineEmits(['change'])
</script>

<template>
  <view class="co-tabs">
    <view 
      v-for="(item, index) in list"
      :key="index"
      class="tab-item" 
      :class="{ active: index === active }" 
      @tap="emits('change', index)"
    >
      {{ item }}
    </view>
  </view>
</template>

<style lang="scss">
.co-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 34rpx;
  padding: 10rpx 150rpx;
  padding-bottom: 30rpx;
  position: relative;

  .tab-item {
    position: relative;

    &.active {
      color: $uni-color-primary;
    }

    &.active::after {
      content: '';
      position: absolute;
      left: 30rpx;
      right: 30rpx;
      bottom: -20rpx;
      border-radius: 10rpx;
      height: 10rpx;
      background-color: $uni-color-primary;
    }
  }
}
</style>
