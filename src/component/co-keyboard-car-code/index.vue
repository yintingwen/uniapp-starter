<script setup>
import { CAR_LETTER_LIST } from '@constants/car'

const props = defineProps({
  numDisabled: { type: Boolean, default: false },
})
const emits = defineEmits(['tapKey', 'search', 'del'])
</script>

<template>
  <view class="co-keyboard-car-code">
    <view class="number-list">
      <button
        class="number-text flex-center"
        v-for="item in 10"
        :key="item"
        hover-class="co-hover-class"
        :hover-stay-time="200"
        :disabled="numDisabled"
        @tap="emits('tapKey', item % 10)"
      >
        {{ item % 10 }}
      </button>
    </view>
    <view class="letter-list flex flex-wrap">
      <view
        class="letter-btn letter flex-center keyword-btn"
        v-for="letter in CAR_LETTER_LIST"
        :key="letter"
        hover-class="co-hover-class"
        :hover-stay-time="200"
        @tap="emits('tapKey', letter)"
      >
        {{ letter }}
      </view>
      <view class="letter-btn btn letter-del flex-center" @tap="emits('del')">
        <co-icon name="backspace" size="60" />
      </view>
      <view class="letter-btn btn letter-search flex-center" @tap="$emit('search')"> 搜索 </view>
    </view>
  </view>
</template>

<style lang="scss">
.co-keyboard-car-code {
  .number-list {
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;

    .number-text {
      font-weight: 700;
      width: 50rpx;
      height: 50rpx;
      border-radius: 10rpx;
      background-color: #fff;
      font-size: 24rpx;
    }
  }

  .letter-list {
    padding-left: 30rpx;

    .letter-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .letter-btn {
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 10rpx;
      line-height: 1;
    }

    .letter {
      height: 80rpx;
      width: 80rpx;
      background-color: #fff;
      font-weight: 700;
    }

    .btn {
      width: 180rpx;
      height: 80rpx;
    }

    .letter-del {
      background-color: #acb4be;
    }

    .letter-search {
      background-color: #5572fc;
      font-size: 36rpx;
      color: #fff;
      font-weight: 700;
    }
  }
}

.co-hover-class {
  background-color: #e5e7eb !important;
}
</style>
