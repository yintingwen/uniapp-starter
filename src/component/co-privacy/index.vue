<script setup>
const privacyContractName = ref('')
const needAuthorization = ref(false)

let authorizationResolve = null

wx.getPrivacySetting({
  success(e) {
    privacyContractName.value = e.privacyContractName
  },
})

wx.onNeedPrivacyAuthorization((resolve) => {
  needAuthorization.value = true
  authorizationResolve = resolve
})

function onAuthorizationChange(event) {
  authorizationResolve({ buttonId: 'agree-btn', event })
  needAuthorization.value = false
  authorizationResolve = null
}
</script>

<template>
  <u-modal
    title="隐私保护指引"
    :show="needAuthorization"
    :closeOnClickOverlay="true"
    @close="onAuthorizationChange('disagree')"
  >
    <view class="co-privacy">
      <view class="des">
        <text>在使用当前小程序服务之前，请仔细阅读</text>
        <text class="link" @tap="openPrivacyContract">{{ privacyContractName }}</text>
        <text>。 如你同意{{ privacyContractName }}，请点击“同意”开始使用。</text>
      </view>
    </view>
    <template #confirmButton>
      <button
        id="agree-btn"
        class="co-privacy-btn agree"
        open-type="agreePrivacyAuthorization"
        @agreeprivacyauthorization="onAuthorizationChange('agree')"
      >
        同意
      </button>
    </template>
  </u-modal>
</template>

<style lang="scss" scoped>
.co-privacy {
  .des {
    font-size: 28rpx;
    text-align: justify;
    line-height: 1.8;

    .link {
      color: $uni-color-primary;
      text-decoration: underline;
    }
  }
}

.co-privacy-btn {
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100rpx;
  box-sizing: border-box;
  background: $uni-color-primary;
  color: #fff;

  &::after {
    border: none;
  }
}
</style>
