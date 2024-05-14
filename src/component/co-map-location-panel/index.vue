<script setup>
const props = defineProps({
  location: { type: String, default: '' },
  speed: { type: [String, Number], default: 0 },
  direction: { type: String, default: '' },
  updateTime: { type: String, default: '' },
  online: { type: Boolean, default: false },
  carNumber: { type: String, default: '' },
  safeAreaInsetBottom: { type: Boolean, default: false },
  show: { type: Boolean, default: false },
  closeable: { type: Boolean, default: false },
  })

const emits = defineEmits(['update:show'])
const carStore = useCarStore()
</script>

<template>
  <view id="co-map-location-panel" class="co-map-location-panel">
    <view class="header">
      <view
        v-if="carStore.trackMap.dataSource === dataSourceEnum.ZJXL"
        class="online"
        :style="{ backgroundColor: online ? '#5277fd' : '#ff9807' }"
      >
        {{ online ? '在线' : '离线' }}
      </view>
      <view class="car-number">{{ carNumber }}</view>
    </view>
    <view class="body">
      <view class="item">
        <view class="label">更新时间：</view>
        <view class="value">{{ updateTime }}</view>
      </view>
      <view class="flex">
        <view class="item">
          <view class="label">当前车速：</view>
          <view class="value">{{ speed }}km/h</view>
        </view>
        <view class="item">
          <view class="label">行驶方向：</view>
          <view class="value">{{ direction }}</view>
        </view>
      </view>
      <view class="item">
        <view class="label">位置信息：</view>
        <view class="value">{{ location }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.co-map-location-panel {
  overflow: hidden;
  background-color: #fff;
  padding: 30rpx 0 10rpx 30rpx;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .online {
      font-size: 28rpx;
      color: #fff;
      padding: 5rpx 20rpx;
      margin-right: 20rpx;
    }

    .car-number {
      font-size: 30rpx;
    }
  }

  .body {
    color: #666;
    font-size: 24rpx;

    .item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20rpx;
      margin-right: 30rpx;

      .label {
        flex-shrink: 0;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
