<script setup>
const userStore = useUserStore()

const props = defineProps({
  show: { type: Boolean, default: false },
  type: { type: Number, default: 0 }, // 0: 实名认证 1: 行驶证授权
  ticket: { type: Number, default: 0 },
  insufficient: { type: Boolean, default: false } // 是否是充值
})

const emits = defineEmits(['update:show', 'confirm', 'cancel', 'recharge'])

const title = computed(() => (props.insufficient ? '票点不足' : '确认查询'))

function onModalCancel() {
  emits('cancel')
  emits('update:show', false)
}

function onModalConfirm() {
  emits('confirm')
}

function onTapRecharge ( ) {
  uni.$router.navigateTo('/pages/recharge/recharge')
  emits('update:show', false)
}
</script>

<template>
  <u-modal
    :show="show"
    :safeAreaInsetBottom="false"
    round="10rpx"
    mode="center"
    :title="title"
    :showConfirmButton="!insufficient"
    :showCancelButton="!insufficient"
    @close="emits('update:show', false)"
    @confirm="onModalConfirm"
    @cancel="onModalCancel"
  >
    <view class="co-modal-ticket">
      <view class="ticket-num">
        <text>剩余票点：</text>
        <text>{{ userStore.ticketBalance }}点</text>
      </view>
      <view class="ticket-num">
        <text>本次消耗：</text>
        <text>{{ ticket }}点</text>
      </view>
      <view class="recharge" v-if="insufficient">
        <button class="recharge-btn" @tap="onTapRecharge">充值票点</button>
        <!-- <u-botton>助力得票点</u-botton> -->
        <button class="cancel-btn" @tap="emits('update:show', false)">取消</button>
      </view>
    </view>
  </u-modal>
</template>

<style lang="scss">
.co-modal-ticket {
  .ticket-num {
    text-align: center;
    margin-top: 30rpx;
  }

  .recharge {
    button {
      width: 500rpx;
      height: 80rpx;
      margin-top: 40rpx;
      line-height: 80rpx;
      font-size: 30rpx;
      color: #fff;
    }

    .recharge-btn {
      background-color: $uni-color-primary;
    }

    .cancel-btn {
      color: #333;
    }
  }
}
</style>
