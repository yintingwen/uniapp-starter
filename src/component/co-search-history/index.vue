<script setup>
const props = defineProps({
  list: { type: Array, default: () => [] }
})

const emits = defineEmits(['tapCarNo'])

const historyCarNo = computed(() => {
  if (!props.list || !props.list.length) return []
  return props.list.map((item) => ({
    carNo: item,
    carColor: item.length === 7 ? '#ffd47c' : '#35d152'
  }))
})

</script>

<template>
  <view class="co-search-history">
    <view class="history-title">历史车牌</view>
    <view class="history-list">
      <view
        v-for="item in historyCarNo"
        :key="item.carNo"
        class="car-no flex-center"
        :style="{ backgroundColor: item.carColor }"
        @tap="emits('tapCarNo', item.carNo)"
      >
        {{ item.carNo }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.co-search-history {
  border-radius: 10rpx;
  background-color: #fff;
  padding: 30rpx 15rpx 15rpx 30rpx;

  .history-title {
    font-weight: 700;
    margin-bottom: 30rpx;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .car-no {
      margin: 0 15rpx 15rpx 0;
      padding: 20rpx;
      line-height: 1;
      font-size: 22rpx;
      font-weight: 700;
      border-radius: 10rpx;
    }
  }
}
</style>
