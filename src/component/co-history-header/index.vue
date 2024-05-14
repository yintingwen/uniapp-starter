<script setup>
const emits = defineEmits(['yearChange', 'monthChange', 'typeChange', 'dateChange'])

const props = defineProps({
  type: { type: Number, default: 1 },
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() + 1 }
})

const systemStore = useSystemStore()
const yearMonthMap = dateUtil.getYearMonthMapByFiniteMonth()
const yearColumn = Object.keys(yearMonthMap).map(Number)

const showYearPicker = ref(false)
const pickerRef = ref(null)

onMounted(() => {
  pickerRef.value.setIndexs([1])
})

watch(
  () => showYearPicker.value,
  (newVal) => {
    if (!newVal) return
    const setIndex = yearColumn.findIndex((item) => item === props.year)
    pickerRef.value.setIndexs([setIndex])
  }
)

function onYearPickerConfirm(e) {
  const index = e.indexs[0]
  const value = yearColumn[index]
  if (value !== props.year) {
    emits('dateChange', {
      year: value,
      month: yearMonthMap[value][0]
    })
  }
  showYearPicker.value = false
}

function onMonthChange(month) {
  if (month === props.month) return
  emits('dateChange', {
    year: props.year,
    month
  })
}
</script>

<template>
  <view class="co-history-header">
    <co-tabs 
      v-if="systemStore.dataSource === dataSourceEnum.ZJXL"
      :list="['急速查车', '精准查车']" 
      :active="type" 
      @change="emits('typeChange', $event + 1)" 
    s/>
    <view class="times flex">
      <view class="year flex" @tap="showYearPicker = true">
        <view> {{ year }}年 </view>
        <co-icon name="down" />
      </view>
      <view class="month flex">
        <view
          class="month-itme"
          :class="{ active: month === item }"
          v-for="item in yearMonthMap[year]"
          :key="item"
          @tap="onMonthChange(item)"
        >
          {{ item }}月
        </view>
      </view>
    </view>
    <u-picker
      ref="pickerRef"
      :show="showYearPicker"
      :columns="[yearColumn]"
      @confirm="onYearPickerConfirm"
      @cancel="showYearPicker = false"
      @close="showYearPicker = false"
    />
  </view>
</template>

<style lang="scss">
.co-history-header {
  background-color: #fff;
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 34rpx;
    padding: 10rpx 150rpx;
    padding-bottom: 30rpx;
    position: relative;
    margin-bottom: 15rpx;

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

  .times {
    padding-top: 15rpx;
    padding-bottom: 30rpx;
    font-size: 28rpx;

    .year {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 30rpx;
    }

    .month {
      .month-itme {
        margin-left: 30rpx;
      }

      .active {
        color: $uni-color-primary;
      }
    }
  }
}
</style>
