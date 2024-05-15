<script setup>
import IndexTicketIcon from './components/IndexTicketIcon'
import IndexShareIcon from './components/IndexShareIcon'
import IndexNewcomerIcon from './components/IndexNewcomerIcon'
import { mockGridData, mockData } from './location'

const userStore = useUserStore()
const mapGridLocation = useMapGridLocation(mockGridData)
const mapPreciseLocation = useMapPreciseLocation(mockData)
const searchType = ref(+(1)) // 0: 网格 1: 精准
const mapPanelShow = ref(true)
const showWxCodePopup = ref(false)
const showNotice = ref(false)
const showServicePopup = ref(false)

// 是否有新人奖励
const hasNewcomerReward = computed(() => userStore.registerDays < 7 && userStore.registerDays > -1)
// 当天的新人奖励领取状态
const todayNewcomerRewardStatus = computed(() => {
  if (!userStore.isLogin) return false
  if (!hasNewcomerReward.value || !userStore.newcomerReward.length) return true
  return userStore.newcomerReward[userStore.registerDays].rewardStatus
})

const useMapLocation = computed(() => (searchType.value ? mapPreciseLocation : mapGridLocation))

onLoad(() => {
  // uni.hideTabBar()
  !userStore.isLogin && (userStore.showNewcomerReward = true)
})

onShareAppMessage((res) => commonHelper.createShareOptions())

function onTapSearchInput() {
  if (!userStore.isLogin) {
    return uni.$router.navigateTo('/pages/login/login')
  }
  uni.$router.navigateTo('/pages/location-query/location-query', { searchType: searchType.value })
}

async function onTapReceive() {
  if (!userStore.isLogin) {
    return uni.$router.navigateTo('/pages/login/login')
  }
  uni.showLoading({ title: '领取中...', mask: true })
  await inviteApi.receiveNewcomerReward()
  await userStore.getNewcomerReward()
  userStore.getBeneficial()
  userStore.showNewcomerReward = false
  uni.hideLoading()
  uni.showToast({ title: '领取成功', icon: 'success' })
}

function onClickInviteBanner() {
  uni.$router.navigateTo('/pages/invite/invite')
}
</script>

<template>
  <co-page :isTabPage="true" :pageFill="true" navbarTitle="shouye">
    <view class="index-page">
      <!-- 头部banner -->
      <swiper autoplay circular vertical class="banner">
        <swiper-item class="banner-item">
          <image
            src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/index/banner.jpg"
            mode="aspectFill"
            @tap="onClickInviteBanner"
          />
        </swiper-item>
        <swiper-item class="banner-item">
          <image
            src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/index/banner1.jpg"
            mode="aspectFill"
            @tap="showWxCodePopup = true"
          />
        </swiper-item>
      </swiper>
      <view style="font-size: 40rpx">
        12312
        <co-icon :type="coIconTypeEnum.IMAGE" size="50" name="https://cdn.uviewui.com/uview/example/button.png"/>

      </view>
      <!-- 中间地图容器 -->
      <!-- <view class="map-container">
        <co-map-location
          :location="useMapLocation"
          :panelShow="mapPanelShow"
          @panelClose="mapPanelShow = false"
        >
          <template #fixed>
            <IndexTicketIcon :surface="mapPanelShow" />
            <IndexShareIcon :surface="mapPanelShow" />
            <IndexNewcomerIcon
              v-if="hasNewcomerReward"
              :surface="mapPanelShow"
              @tap="userStore.showNewcomerReward = true"
            />
          </template>
        </co-map-location>
      </view> -->
      <!-- 搜索类型切换 -->
      <view class="type-switch">
        <!-- <co-type-switch
          v-model="searchType"
          textColor="#656565"
          activeTextColor="#ffffff"
          backgroundColor="#ffe8d9"
          :activeBackgroundColor="appConfig.primayColor"
        >
          <view class="swich-content" @tap="onTapSearchInput">
            <view class="precies-title">
              精准查定位
              <text>限时免行驶证</text>
            </view>
            <view class="switch-input">
              <co-icon name="search" size="28" />
              <text class="switch-input-text">请输入车牌号</text>
            </view>
          </view>
        </co-type-switch> -->
      </view>
    </view>
    <u-popup
      mode="center"
      bgColor="transparent"
      :show="userStore.showNewcomerReward"
      :zIndex="999999"
      :round="20"
      :safeAreaInsetBottom="false"
      :closeOnClickOverlay="true"
      @close="userStore.showNewcomerReward = false"
    >
      <view class="newcomer-reward">
        <image
          class="newcomer-header"
          src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/rewcomer/header.png"
          mode="widthFix"
        />
        <view class="newcomer-body">
          <view class="gift-list">
            <view
              v-for="(item, index) in userStore.newcomerReward"
              :key="index"
              class="gift-item"
              :class="{
                'gift-today': index === userStore.registerDays,
                'gift-claimed': item.rewardStatus
              }"
            >
              <view class="gift-image">
                <image
                  v-if="item.rewardStatus"
                  class="gift-claimed-image"
                  src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/rewcomer/claimed.png"
                  mode="widthFix"
                />
                <image
                  class="gift-card-image"
                  src="https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/rewcomer/card.png"
                  mode="heightFix"
                />
                <view>{{ item.rewardNum }}票点</view>
              </view>
              <view class="gift-day">
                <text v-if="index === userStore.registerDays">
                  {{ item.rewardStatus ? '已到账' : '今天' }}
                </text>
                <text v-else-if="index < userStore.registerDays" class="last-day">
                  {{ item.rewardStatus ? '已到账' : '已过期' }}
                </text>
                <text v-else>{{ `第${index + 1}天` }}</text>
              </view>
            </view>
            <view class="gift-item"></view>
          </view>
          <button v-if="todayNewcomerRewardStatus" class="gift-btn gift-btn-disabled flex-center">
            今日已领取，明日再来哦~
          </button>
          <button v-else class="gift-btn flex-center" @tap="onTapReceive">收下奖励</button>
        </view>
      </view>
    </u-popup>
    <u-modal
      title="公告"
      mode="center"
      :show="showNotice"
      confirm-text="联系客服"
      @confirm="showServicePopup = true"
    >
      <view class="notice-content">
        <view>系统更新维护中，部分功能将会产生异常，预计5月升级完成，升级完成后将给您补偿票点</view>
      </view>
    </u-modal>
  </co-page>
</template>

<style lang="scss">
.notice-content {
  view {
    font-size: 28rpx;
    line-height: 1.5;
  }
}
.index-page {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  .banner {
    height: 92rpx;

    .banner-item {
      height: 92rpx;
    }

    image {
      height: 100%;
      width: 100%;
      vertical-align: top;
    }
  }

  .map-container {
    flex: 1;
    overflow: hidden;
    position: relative;
  }
}

.type-switch {
  position: fixed;
  top: 117rpx;
  left: 25rpx;
  right: 25rpx;

  .swich-content {
    padding: 25rpx;

    .precies-title {
      color: #fff;
      display: flex;
      align-items: flex-end;
      margin-bottom: 20rpx;
      font-size: 36rpx;
      font-weight: 700;

      text {
        padding: 0 20rpx;
        margin-left: 20rpx;
        background-color: #fff;
        color: $uni-color-primary;
        font-size: 24rpx;
        font-weight: 400;
        border-radius: 20rpx;
      }
    }

    .switch-input {
      background-color: #fff;
      padding: 20rpx 25rpx;
      font-size: 28rpx;
      color: #282828;

      .switch-input-text {
        margin-left: 25rpx;
        font-size: 32rpx;
      }
    }
  }
}

.newcomer-reward {
  width: 640rpx;

  .newcomer-header {
    width: 640rpx;
    vertical-align: top;
    position: relative;
  }

  .newcomer-body {
    position: relative;
    z-index: 10;
    margin-top: -20rpx;
    padding-bottom: 52rpx;
    background-color: #fff;
    border-radius: 20rpx 20rpx 40rpx 40rpx;

    .gift-list {
      padding: 20rpx 20rpx 8rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .gift-item {
        width: 134rpx;
        margin-bottom: 18rpx;
        text-align: center;

        .gift-image {
          height: 166rpx;
          padding-top: 14rpx;
          box-sizing: border-box;
          border-radius: 15rpx;
          font-size: 28rpx;
          line-height: 46rpx;
          background: #fff1da;
          color: #f6a513;
          position: relative;

          .gift-card-image {
            height: 100rpx;
            vertical-align: top;
          }

          .gift-claimed-image {
            position: absolute;
            height: 36rpx;
            width: 36rpx;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .gift-day {
          font-size: 24rpx;
          line-height: 48rpx;
          margin-top: 6rpx;

          .last-day {
            color: #ea585a;
          }
        }
      }

      .gift-claimed {
        .gift-image {
          background: #ffe2b2;
        }
      }

      .gift-today {
        .gift-image {
          background: linear-gradient(180deg, #ffdfa9 0%, #ff5f63 100%);
          color: #fff !important;
        }
      }
    }

    .gift-btn {
      width: 560rpx;
      height: 90rpx;
      border-radius: 45rpx;
      font-size: 30rpx;
      color: #fff;
      background: #ff4d3a;
      margin: 0 40rpx;
    }

    .gift-btn-disabled {
      background: #cccccc;
      color: #fff;
    }
  }
}
</style>
