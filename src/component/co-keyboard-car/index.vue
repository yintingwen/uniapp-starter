<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  show: { type: Boolean, default: false },
  maxLength: { type: Number, default: 7 },
  safeAreaInsetBottom: { type: Boolean, default: false }
})

const emits = defineEmits(['change', 'update:modelValue', 'update:show', 'search', 'tapKey'])
const numDisabled = computed(() => props.modelValue.length < 2)
const showKeyboard = computed(() => props.modelValue.length)

function onTapKey(key) {
  emits('tapKey', key)
  if (props.modelValue.length >= props.maxLength) return  
  emits('update:modelValue', props.modelValue + key)
  emits('change', props.modelValue + key)
}

function onTapDel() {
  const value = props.modelValue.slice(0, -1)
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<template>
  <u-popup
    :show="show"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :overlay-style="{ opacity: 0}"
    position="bottom"
    @close="emits('update:show', false)"
  >
    <view class="co-car-keyword">
      <co-keyboard-car-province  v-if="!showKeyboard" @tapKey="onTapKey"/>
      <co-keyboard-car-code 
        v-else
        :numDisabled="numDisabled"
        @tapKey="onTapKey"
        @del="onTapDel"
        @search="$emit('search')"
      />
    </view>
  </u-popup>
</template>

<style lang="scss">
.co-car-keyword {
  background-color: #d1d5db;
}

</style>
