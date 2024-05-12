import uviewPlus from 'uview-plus'

const uviewPlusConfig = {
  // 修改$u.config对象的属性
  config: {
    // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    unit: 'rpx'
  },
  // 修改$u.props对象的属性
  props: {
    // 其他组件属性配置
    // ......
  }
}

export default (app) => {
  app.use(uviewPlus)
  uni.$u.setConfig(uviewPlusConfig)
}