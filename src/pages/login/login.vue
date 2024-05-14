<script setup>
const userStore = useUserStore()

let redirect = null
const isChecked = ref([])

onLoad(async (e) => {
  // endJumpToLogin()
  redirect = e.redirect && decodeURIComponent(e.redirect)
})

onUnload(() => {
  // endJumpToLogin()
})

/**
 * 获取手机号
 */
async function onGetPhoneNumber(e) {
  if (!isChecked.value[0]) {
    return uni.showToast({ title: '请确认同意用户协议和隐私协议', icon: 'none' })
  }
  if (e.detail.errMsg !== 'getPhoneNumber:ok') return
  uni.showLoading({ title: '登录中', mask: true })
  try {
    const { code } = await uni.login()
    await userStore.login({
      phoneCode: e.detail.code,
      loginCode: code,
    })
    uni.hideLoading()
    if (redirect) {
      uni.redirectTo({ url: redirect })
    } else {
      uni.navigateBack({
        success() {
          const page = getCurrentPages().pop()
          page && page.onLoad(page.options)
        }
      })
    }
  } catch (e) {
    console.log(e);
    uni.hideLoading()
    uni.showToast({ title: '登录失败', icon: 'none' })
  }
}

function onTapProtocol(e) {
  isChecked.value = isChecked.value[0] ? [] : ['protocol']
}

/**
 * 点击协议
 */
function onTapLink(type) {
  uni.$router.navigateTo('/pages/protocol/protocol', { type })
}
</script>

<template>
  <co-page :checkLogin="false">
    <view class="login-page">
      <view class="title">欢迎使用货车工具宝</view>
      <image
        src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/common/login_bg.png"
        mode="widthFix"
      />
      <button
        class="login-btn flex-center"
        type="primary"
        :open-type="isChecked[0] ? 'getPhoneNumber' : ''"
        @getphonenumber="onGetPhoneNumber"
      >
        手机号快捷登录
      </button>
      <view class="protocol flex-center" @tap="onTapProtocol">
        <u-checkbox-group v-model="isChecked">
          <u-checkbox
            activeColor="#fc6303"
            size="30rpx"
            iconSize="20rpx"
            shape="circle"
            name="protocol"
          >
          </u-checkbox>
        </u-checkbox-group>
        <text>登录代表您已同意</text>
        <text class="link" @tap.stop="onTapLink('user')">《用户协议》</text>
        <text>和</text>
        <text class="link" @tap.stop="onTapLink('privacy')">《隐私协议》</text>
      </view>
    </view>
  </co-page>
  <co-privacy />
</template>

<style lang="scss">
.login-page {
  .title {
    font-size: 40rpx;
    text-align: center;
    padding: 20rpx 0;
  }

  image {
    width: 100%;
    margin-bottom: 150rpx;
  }

  .login-btn {
    background-color: $uni-color-primary;
    width: 600rpx;
    margin: 0 auto;
    border-radius: 100rpx;
    padding: 0;
    height: 100rpx;
    font-size: 30rpx;
  }

  .protocol {
    padding: 30rpx 0;
    font-size: 24rpx;
    line-height: 1;
    margin-top: 20rpx;

    .link {
      color: $uni-color-primary;
    }
  }
}
</style>
