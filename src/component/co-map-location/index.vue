<script setup>
const componentIns = getCurrentInstance()
const props = defineProps({
  location: { type: Object, default: () => ({}) },
  carNumber: { type: String, default: '示例信息' },
  panelShow: { type: Boolean, default: false },
  panelCloseable: { type: Boolean, default: true },
  safeAreaInsetBottom: { type: Boolean, default: false },
  watchPanelHeight: { type: Boolean, default: false },
})

const emits = defineEmits(['panelClose'])

const fixedBoxHeight = ref(0)

watch(
  () => props.panelShow,
  async (newVal) => {
    if (!newVal) {
      fixedBoxHeight.value = 0
    } else {
      await nextTick()
      uni
        .createSelectorQuery()
        .in(componentIns)
        .select('#aaa')
        .fields({ size: true }, (res) => {
          fixedBoxHeight.value = res.height
        })
        .exec()
    }
  },
  { immediate: true }
)

const duration = computed(() => (props.panelShow ? 0 : 300))
const enableSatellite = ref(false)
const locationValue = computed(() => props.location.value)
</script>
<template>
  <view class="custom-map-fuzzy-location">
    <map
      :style="{ width: '100%', height: '100%' }"
      :latitude="locationValue.latitude"
      :longitude="locationValue.longitude"
      :circles="locationValue.circles || []"
      :scale="locationValue.scale"
      :markers="locationValue.markers"
      :enable-building="true"
      :enable-satellite="enableSatellite"
      @regionchange="location.onMapRegionChange"
    >
      <cover-view slot="callout">
        <cover-view marker-id="1" class="custom-callout">货车在圆圈内任意位置</cover-view>
      </cover-view>
    </map>
    <view class="custom-map-location-fixed-box" :style="{ bottom: fixedBoxHeight + 'px' }">
      <view class="map-render-type">
        <view class="btn">
          <view :class="{ active: !enableSatellite }" @tap="() => (enableSatellite = false)">
            地图
          </view>
          <view :class="{ active: enableSatellite }" @tap="() => (enableSatellite = true)">
            卫星
          </view>
        </view>
        <u-safe-bottom v-if="safeAreaInsetBottom"></u-safe-bottom>
      </view>
      <slot name="fixed"></slot>
    </view>
    <u-popup
      :zIndex="1"
      position="bottom"
      :overlay="false"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      :closeable="panelCloseable"
      :duration="duration"
      :show="panelShow"
      @close="emits('panelClose', false)"
    >
      <co-map-location-panel
        id="aaa"
        :watchHeight="watchPanelHeight"
        :carNumber="carNumber"
        :direction="locationValue.direction"
        :updateTime="locationValue.updateTime"
        :speed="locationValue.speed"
        :online="locationValue.online"
        :location="locationValue.locationInfo"
      />
    </u-popup>
  </view>
</template>
<style lang="scss" scoped>
.custom-map-fuzzy-location {
  height: 100%;
  width: 100%;
  position: relative;

  .map-render-type {
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;

    .btn {
      display: flex;
      justify-content: flex-end;
      border: 4rpx solid #5572fd;
      color: #5277fd;
      border-radius: 10rpx;
      background-color: #fff;

      > view {
        padding: 10rpx;
      }

      > view.active {
        background-color: #5572fd;
        color: #fff;
      }
    }
  }

  .map-content-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;

    .map-fixed-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
  }

  .custom-callout {
    background-color: #5277fd;
    color: #ffffff;
    padding: 3rpx 18rpx;
    font-size: 14px;
    text-align: center;
    line-height: 1.5;
  }
}

.custom-map-location-fixed-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
