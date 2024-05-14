<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  type: { type: Number, default: 0 }, // 0: 实名认证 1: 行驶证授权
})
const systemStore = useSystemStore()
const emits = defineEmits(['update:show', 'confirm', 'cancel'])

const modalTitle = computed(() => (props.type ? '该车辆还未授权' : '请先进行实名认证'))
const modalContent = computed(() => {
  if (systemStore.dataSource === dataSourceEnum.XMYX) {
    return '根据网信办要求，需要完成实名认证后才可查车'
  } else {
    return props.type
      ? '根据网信办要求，精准查询需要先完成行驶证授权'
      : '根据网信办要求，需要完成实名认证后才可查车，如果要精准查询还需完成行驶证授权'
  }
})
const modalConfirmBtnText = computed(() => (props.type ? '去授权' : '去认证'))

function onModalCancel() {
  emits('cancel')
  emits('update:show', false)
}

function onModalConfirm() {
  emits('confirm')
}
</script>

<template>
  <u-modal
    :show="show"
    :safeAreaInsetBottom="false"
    round="10rpx"
    mode="center"
    :title="modalTitle"
    :showCancelButton="true"
    :confirmText="modalConfirmBtnText"
    @close="emits('update:show')"
    @confirm="onModalConfirm"
    @cancel="onModalCancel"
  >
    <view class="co-modal-authorized">
      <view class="centent">
        {{ modalContent }}
      </view>
    </view>
  </u-modal>
</template>

<style lang="scss">
.co-modal-authorized {
  .img {
    text-align: center;
    margin-bottom: 40rpx;

    image {
      width: 400rpx;
    }
  }

  .centent {
    text-align: center;
    font-size: 30rpx;
    color: #333;
    line-height: 46rpx;
    font-weight: 700;
  }
}
</style>
