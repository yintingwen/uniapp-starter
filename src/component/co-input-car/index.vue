<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  maxLength: { type: Number, default: 7 },
  separateIndex: { type: Number, default: 2 }
})
const emits = defineEmits(['update:modelValue', 'update:show'])

const showKeyboard = ref(false) // 是否显示键盘
const foucsInput = ref(false) // 是否聚焦输入框
const inputActiveIndex = ref(0) // 当前激活的输入框索引

/**
 * 点击输入框
 * @param {*} index 点击的block下标
 */
function onTapInputBlock(index) {
  if (index === props.separateIndex) return
  const { modelValue } = props
  showKeyboard.value = true
  foucsInput.value = true
  const useValueIndex = trasformIndex(index)
  if (modelValue[useValueIndex]) {
    inputActiveIndex.value = useValueIndex
  } else {
    inputActiveIndex.value = modelValue.length ? modelValue.length : 0
  }
}
/**
 * 键盘关闭
 */
function onKeyboardClose() {
  showKeyboard.value = false
  foucsInput.value = false
}
/**
 * 键盘点击事件
 * @param {*} key
 */
function onKeyboardTapKey(key) {
  let newValue = props.modelValue
  if (inputActiveIndex.value > props.modelValue) {
    newValue += key
  } else {
    newValue = newValue.split('')
    newValue[inputActiveIndex.value] = key
    newValue = newValue.join('')
  }
  inputActiveIndex.value += 1
  emits('update:modelValue', newValue)
  if (inputActiveIndex.value === props.maxLength) {
    onKeyboardClose()
  }
}

function onKeyboardTapDel() {
  if (!props.modelValue.length) return
  if (props.modelValue.length === props.maxLength) {
    inputActiveIndex.value = props.maxLength - 1
  } else if (props.modelValue.length !== inputActiveIndex.value + 1) {
    inputActiveIndex.value -= 1
  }
  emits('update:modelValue', props.modelValue.slice(0, -1))
}
/**
 * 弹出层关闭
 */
function onPopupClose() {
  showKeyboard.value = false
  foucsInput.value = false
}
/**
 * 索引转换，分隔符索引不计入，将遍历的下标转为实际的字符下标
 * @param {*} index 遍历索引
 */
function trasformIndex(index) {
  if (index < props.separateIndex) return index
  if (index === props.separateIndex) return undefined
  return index - 1
}
</script>
<template>
  <view class="co-input-car flex-between">
    <view v-for="(item, index) in maxLength + 1" :key="index">
      <view
        v-if="index !== separateIndex"
        :key="item"
        class="input-block flex-center"
        :class="{ active: foucsInput && inputActiveIndex === trasformIndex(index) }"
        @tap="onTapInputBlock(index)"
      >
        {{ modelValue[trasformIndex(index)] }}
      </view>
      <view v-else class="separate-dot"></view>
    </view>
  </view>
  <u-popup
    :show="showKeyboard"
    :safe-area-inset-bottom="true"
    :overlay-style="{ opacity: 0 }"
    :closeOnClickOverlay="true"
    @close="onPopupClose"
  >
    <view class="keyboard">
      <co-keyboard-car-province v-if="inputActiveIndex === 0" @tapKey="onKeyboardTapKey" />
      <co-keyboard-car-code
        v-else
        :numDisabled="inputActiveIndex === 1"
        @tapKey="onKeyboardTapKey"
        @del="onKeyboardTapDel"
      />
    </view>
  </u-popup>
</template>

<style lang="scss" scoped>
.co-input-car {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .input-block {
    height: 100rpx;
    width: 75rpx;
    background-color: #f2f2f2;
    border-radius: 10rpx;
    box-sizing: border-box;
  }

  .active {
    border: 2rpx solid #5572fd;
  }

  .separate-dot {
    height: 12rpx;
    width: 12rpx;
    background-color: #d8d8d8;
    border-radius: 50%;
  }
}

.keyboard {
  background-color: #d1d5db;
}
</style>
