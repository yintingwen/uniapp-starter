<script setup>
let messageStorageKey = null
const src = ref('')

onLoad((options) => {
  src.value = decodeURIComponent(options.url)
  messageStorageKey = decodeURIComponent(options.messageKey)

  options.title &&
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.title)
    })
})

function onMessage(e) {
  uni.setStorageSync(messageStorageKey, e.detail.data)
}
</script>

<template>
  <web-view :src="src" @message="onMessage"></web-view>
</template>

<style lang=""></style>
