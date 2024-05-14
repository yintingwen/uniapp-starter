<script setup>
const emits = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  textColor: { type: String },
  activeTextColor: { type: String },
  backgroundColor: { type: String },
  activeBackgroundColor: { type: String },
})
const systemStore = useSystemStore()

// 精准查询样式
const blurStyle = computed(() => ({
  color: props.modelValue ? props.textColor : props.activeTextColor,
  backgroundColor: props.modelValue ? 'transparent' : props.activeBackgroundColor,
}))
// 精准查询样式
const preciseStyle = computed(() => ({
  backgroundColor: props.modelValue ? props.activeBackgroundColor : 'transparent',
  color: props.modelValue ? props.activeTextColor : props.textColor,
}))
// tab样式
const tabStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
}))
// 面板样式
const slotStyle = computed(() => ({
  backgroundColor: props.activeBackgroundColor,
}))

function onTabChange(type) {
  emits('update:modelValue', type)
  emits('change', type)
}
</script>

<template>
  <view class="co-type-switch">
    <view class="switch-tab" :style="tabStyle" v-if="systemStore.dataSource === dataSourceEnum.ZJXL">
      <view class="tab-item blur" :style="blurStyle" @tap="onTabChange(0)">
        <view class="tab-item-content blur-content">
          <view>急速查车</view>
          <view class="tips"> 免行驶证 </view>
        </view>
      </view>
      <view class="tab-item precise" :style="preciseStyle" @tap="onTabChange(1)">
        <view class="tab-item-content precise-content">
          <view>精准查询</view>
        </view>
      </view>
    </view>
    <view :style="slotStyle">
      <slot></slot>
    </view>
    <!-- <view class="overlay-line" :style="{ backgroundColor: activeBackgroundColor }"></view> -->
  </view>
</template>

<style lang="scss">
.co-type-switch {
  border-radius: 10rpx;
  overflow: hidden;
  position: relative;

  .switch-tab {
    height: 70rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;

    .tab-item {
      height: 100%;
      flex: 1;
      transform-origin: center;
      border-radius: 15rpx;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      &.blur {
        transform: translateX(-16rpx) skewX(25deg);
        padding-left: 45rpx;
      }
      &.precise {
        background-color: skyblue;
        transform: translateX(16rpx) skewX(-25deg);
        padding-right: 45rpx;
      }

      .tab-item-content {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 28rpx;

        &.blur-content {
          transform: skewX(-25deg);
          justify-content: flex-start;
          padding-left: 60rpx;

          .tips {
            margin-top: 8rpx;
            margin-left: 5rpx;
            align-self: flex-start;
            line-height: 1;
            font-size: 18rpx;
            background-color: #46b280;
            color: #fff;
            border-radius: 20rpx;
            padding: 4rpx 8rpx;
          }
        }

        &.precise-content {
          transform: skewX(25deg);
          justify-content: flex-end;
          padding-right: 60rpx;
        }
      }
    }
  }

  .overlay-line {
    position: absolute;
    top: 69rpx;
    left: 0;
    right: 0;
    height: 4rpx;
  }
}
</style>
