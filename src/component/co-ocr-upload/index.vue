<script setup>
const userStore = useUserStore()
const props = defineProps({
  type: { type: String, default: 'cardFront' },
  url: { type: String },
})
const emits = defineEmits(['uploadSuccess', 'ocrSuccess'])

const uploadType = {
  cardFront: {
    imageType: 'idcard',
    imageSide: 'front',
    imagePlaceholder: 'https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/common/card-front.png',
    text: '拍摄/上传身份证正面',
  },
  cardBack: {
    imageType: 'idcard',
    imageSide: 'back',
    imagePlaceholder: 'https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/common/card-back.png',
    text: '拍摄/上传身份证反面',
  },
}

const uploadForm = reactive({
  ...uploadType[props.type],
})

async function onTapUpload() {
  const { tempFiles } = await uni.chooseMedia({
    count: 1,
    mediaType: 'image',
    sourceType: 'album',
  })
  const file = tempFiles[0]
  uni.showLoading({ title: '上传中', mask: true })
  try {
    const url = await ossUtil.upload(file.tempFilePath, 'ID_CARD', userStore.userInfo.mobile)
    emits('uploadSuccess', url)
    const ocrInfo = await ocr(url)
    emits('ocrSuccess', ocrInfo )
    emits('success', { url, ...ocrInfo })
    uni.hideLoading() 
  } catch (e) {
    console.log(e);
    uni.hideLoading()
    uni.showToast({ icon: 'error', title: '上传失败' })
  }

  // } catch (error) {
    // uni.hideLoading()
    // uni.showToast({ icon: 'error', title: error.message })
  // }
}

async function ocr(url) {
  try {
    const { content = {} } = await commonApi.ocr({
      url,
      imageType: uploadForm.imageType,
      imageSide: uploadForm.imageSide,
    })
    return content
  } catch (error) {
    return {}
  }
}
</script>

<template>
  <view class="co-ocr-upload">
    <view class="upload-box flex-center" @tap="onTapUpload">
      <view class="border-box">
        <view class="border-item border-tl"></view>
        <view class="border-item border-tr"></view>
        <view class="border-item border-bl"></view>
        <view class="border-item border-br"></view>
      </view>
      <view class="upload-image">
        <image :src="url || uploadForm.imagePlaceholder" mode="scaleToFill" />
        <view v-if="!url" class="upload-image-scan flex-center">
          <view class="upload-image-scan-icon flex-center">
            <co-icon :name="'xiangji'" size="50" />
          </view>
          <view class="upload-image-scan-text">{{ uploadForm.text }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$border-color: #00479d;
.co-ocr-upload {
  width: 500rpx;
  border-radius: 20rpx;
  padding: 30rpx 50rpx;
  box-sizing: border-box;
  border: 2rpx solid #e5e5e5;

  .upload-box {
    height: 240rpx;
    position: relative;

    .border-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      .border-item {
        position: absolute;
        box-sizing: border-box;
        width: 18rpx;
        height: 18rpx;
      }

      .border-tl {
        position: absolute;
        left: 0;
        top: 0;
        border-top: 4rpx solid $primary-color;
        border-left: 4rpx solid $primary-color;
      }

      .border-tr {
        position: absolute;
        right: 0;
        top: 0;
        border-top: 4rpx solid $primary-color;
        border-right: 4rpx solid $primary-color;
      }

      .border-bl {
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 4rpx solid $primary-color;
        border-left: 4rpx solid $primary-color;
      }

      .border-br {
        position: absolute;
        bottom: 0;
        right: 0;
        border-bottom: 4rpx solid $primary-color;
        border-right: 4rpx solid $primary-color;
      }
    }

    .upload-image {
      width: 320rpx;
      height: 200rpx;
      position: relative;

      image {
        height: 100%;
        width: 100%;
      }

      .upload-image-scan {
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        color: #666666;

        .upload-image-scan-icon {
          background: #fff;
          border-radius: 50%;
          height: 80rpx;
          width: 80rpx;
          margin-bottom: 6rpx;
        }

        .upload-image-scan-text {
          font-size: 24rpx;
          word-wrap: nowarp;
        }
      }
    }
  }
}
</style>
