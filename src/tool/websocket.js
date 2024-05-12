import WebsocketClient from '@/lib/WebsocketClient'
let pingTimmer = null
let reconnecting = false

const websocket = new WebsocketClient({
  reconnect: true,
  reconnectInterval: 1000,
  reconnectMaxCount: 99999
})

websocket.on('open', async () => {
  const orderStore = useOrderStore()
  uniUtil.showToast('网络连接成功')
  reconnecting = false
  websocket.send({ type: 'ping' })
  pingTimmer = setInterval(() => websocket.send({ type: 'ping' }), 10000)
  if (orderStore.open) {
    orderStore.setOpen(true)
  }
})

websocket.on('close', () => {
  if (reconnecting) return

  uniUtil.showToast('网络链接断开')
  const orderStore = useOrderStore()
  const userStore = useUserStore()

  orderStore.setPopupShow(false)
  orderStore.clearPopupList()
  orderStore.clearWaitingOrder()
  userStore.setWsBind(false)
  userStore.setWsClientId(null)

  clearInterval(pingTimmer)
})

websocket.on('reconnect', () => {
  if (reconnecting) return
  reconnecting = true
  uniUtil.showLoading('网络连接中', false)
})

websocket.on('message', async (data) => {
  const orderStore = useOrderStore()

  const { type, order } = data

  // 用户绑定ws连接
  if (type === wsMessageTypeEnum.INIT) {
    userHelper.bindWebscoket(data['client_id'])
  }

  // 匹配到订单
  if (type === wsMessageTypeEnum.ORDER_SEND) {
    orderHelper.addOrderList(order)
  }

  // 删除等待中的订单
  if ([wsMessageTypeEnum.GRAD_SUCCESS, wsMessageTypeEnum.GRAD_CANCEL].includes(type)) {
    orderStore.updateWaitingOrder(order, 1)
  }

  // 向外暴露订单事件
  websocket.emit(type, order)
})

websocket.on(wsMessageTypeEnum.GRAD_SUCCESS, async (e) => {
  const orderStore = useOrderStore()
  const id = `grap-${Date.now()}`
  if (orderStore.indexScrollList.length >= 100) {
    orderStore.indexScrollList.shift()
  }
  orderStore.indexScrollList.push({ ...e, id })
  await nextTick()
})

export default websocket
