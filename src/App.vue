<script setup>
const userStore = useUserStore()

onLaunch(() => {
  if (userStore.isLogin) {
    userStore.getUserBaseInfo()
  }
})
</script>

<style lang="scss">
@import '~@/uni_modules/uview-plus/index.scss';
@import '~@/styles/utils.scss';
@import '~@/styles/global.scss';
@import './icons/iconfont.css';
/*每个页面公共css */
</style>
