<template>
  <text 
    v-if="type === 'font'" 
    :class="['co-icon-font', iconClass]"
    :style="iconStyle"
  ></text>
  <image v-else class="co-icon" :src="imgPath" :style="imageStyle" mode="heightFix"/>
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  type: { type: String, default: 'font' },
  name: { type: String, default: '' },
  size: { type: [Number, String], default: 'inherit' },
  color: { type: String, default: 'inherit' },
})
const iconClass = computed(() => {
  return `iconfont icon-${props.name}`
})

const iconStyle = computed(() => {
  return {
    color: props.color,
    fontSize: isNaN(Number(props.size)) ? props.size : `${props.size}rpx`
  }
})

const imgPath = computed(() => {
  return `/static/icons/${props.name}.png`
})

const imageStyle = computed(() => {
  const height = isNaN(Number(props.size)) ? props.size : `${props.size}rpx`
  return {
    height
  }
})
</script>

<style lang="scss">
.co-icon-font {
  line-height: 1;
  font-size: 28rpx;
}
</style>