<script setup>
const userStore = useUserStore()

onLaunch(() => {
  if (userStore.isLogin) {
    userStore.getUserBaseInfo()
  }
})
</script>

<style lang="scss">
@import './icon/iconfont.css';
@import './style/index.scss';
</style>
