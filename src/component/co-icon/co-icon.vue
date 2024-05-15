<template>
  <text
    v-if="type === coIconTypeEnum.ICONFONT"
    :class="['co-icon-font', iconClass]"
    :style="iconStyle"
  ></text>
  <u-icon
    v-else-if="type === coIconTypeEnum.UVIEW"
    name="photo"
    :size="size"
    :color="color"
  ></u-icon>
  <image v-else class="co-icon" :src="getImgPath" :style="imageStyle" mode="heightFix" />
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  type: { type: String, default: coIconTypeEnum.ICONFONT },
  name: { type: String, default: '' },
  size: { type: [Number, String], default: 'inherit' },
  color: { type: String, default: 'inherit' },
  imgPath: { type: String, default: iconConfig.imgPath }, // 图标文件所在的路径
})
const iconClass = computed(() => {
  return `iconfont icon-${props.name}`
})

const iconStyle = computed(() => {
  return {
    color: props.color,
    fontSize: isNaN(Number(props.size)) ? props.size : `${props.size}rpx`,
  }
})

const getImgPath = computed(() => {
  if (props.name.startsWith('http')) return props.name
  if (props.name.startsWith('/static')) return props.name
  return `/static${props.imgPath}/${props.name}.png`
})

const imageStyle = computed(() => {
  const height = isNaN(Number(props.size)) ? props.size : `${props.size}rpx`
  return {
    height,
  }
})
</script>

<style lang="scss">
.co-icon-font {
  line-height: 1;
  font-size: 28rpx;
}

image.co-icon {
  vertical-align: top;
}
</style>
