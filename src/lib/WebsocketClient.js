// src/WebsocketClient.ts
import EventEmitter from 'eventemitter3'

// src/WebscoketClientInterceptor.ts
var WEBSOCKET_CLIENT_INTERCEPTOR_NAMES = ['send', 'message', 'sub', 'unsub']
var WebscoketClientInterceptor = class {
  constructor() {
    this.interceptorNames = WEBSOCKET_CLIENT_INTERCEPTOR_NAMES
    this.interceptors = {}
    this.interceptorNames.forEach((name) => {
      this.interceptors[name] = []
    })
  }
  use(name, interceptor) {
    if (typeof interceptor !== 'function') {
      throw new Error('interceptor must be a function')
    }
    if (this.interceptorNames.includes(name)) {
      this.interceptors[name].push(interceptor)
    }
  }
  eject(name, interceptor) {
    if (!this.interceptorNames.includes(name)) return
    const index = this.interceptors[name].indexOf(interceptor)
    if (index === -1) return
    this.interceptors[name].splice(index, 1)
  }
  async run(name, data, content) {
    const interceptors = this.interceptors[name]
    if (interceptors.length) {
      for (const interceptor of interceptors) {
        data = await interceptor.call(content, data)
      }
    }
    return data
  }
}

// src/WebsocketClientReconnector.ts
var WebsocketClientReconnector = class {
  // 重连任务
  constructor(options = {}) {
    const nOptions = normalizeOptions(options)
    this.initOptions = nOptions
    this.reset()
  }
  /**
   * 重置重连器
   */
  reset() {
    this.clearDelay()
    this.state = 0 /* INIT */
    this.timer = null
    this.count = 0
    this.maxCount = this.initOptions.maxCount
    this.interval = this.initOptions.interval
    this.tasks = this.initOptions.tasks
  }
  /**
   * 立刻重连
   */
  run(task = 'run') {
    if (this.state === 2 /* START */) return
    if (this.state === 1 /* WAITING */) this.clearDelay()
    this.state = 2 /* START */
    this.runRecconectTask(task)
  }
  /**
   * 延迟重连
   */
  delayRun(task = 'delayRun') {
    if (this.state === 1 /* WAITING */) return
    this.clearDelay()
    this.state = 1 /* WAITING */
    this.timer = setTimeout(() => {
      this.state = 2
      this.runRecconectTask(task)
    }, this.interval)
  }
  /**
   * 执行重连任务
   */
  runRecconectTask(task) {
    if (this.count >= this.maxCount) {
      throw new Error('reconnect max count')
    }
    this.maxCount++
    const targetTask = this.tasks[task]
    if (!targetTask) throw new Error('task is not exist')
    return targetTask(this)
  }
  clearDelay() {
    this.timer && clearTimeout(this.timer)
    this.timer = null
  }
}
function normalizeOptions(options) {
  var _a, _b, _c
  return {
    maxCount: (_a = options.maxCount) != null ? _a : 5,
    interval: (_b = options.interval) != null ? _b : 500,
    tasks: (_c = options.tasks) != null ? _c : {}
  }
}

// src/WebsocketClientTemplate.ts
var WebsocketClientTemplate = class {
  constructor() {
    this.templates = {}
  }
  add(name, genaertor) {
    this.templates[name] = genaertor
  }
  get(name) {
    return this.templates[name]
  }
  generate(name, data) {
    return this.templates[name] ? this.templates[name](data) : data
  }
}

// src/WebsocketClient.ts
var _WebsocketClient = class {
  /**
   * 构造函数
   */
  constructor(options) {
    // 连接地址
    this.socket = null
    // 重连间隔
    this.reconnectLock = false
    if (!options) throw new Error('options is required')
    const nOptions = normalizeOptions2(options)
    this.initOptions = nOptions
    this.url = nOptions.url
    this.subCollection = {}
    this.reconnectOpen = nOptions.reconnect
    this.reconnectMaxCount = nOptions.reconnectMaxCount
    this.reconnectInterval = nOptions.reconnectInterval
    this.status = 0 /* INIT */
    this.template = new WebsocketClientTemplate()
    this.event = new EventEmitter()
    this.interceptor = new WebscoketClientInterceptor()
    this.reconnector = new WebsocketClientReconnector({
      maxCount: this.reconnectMaxCount,
      interval: this.reconnectInterval,
      tasks: {
        run: () => this.createConnect(),
        delayRun: () => this.connect()
      }
    })
    uni.onNetworkStatusChange((e) => {
      if (this.networkIsConnected === e.isConnected) return
      if (this.networkIsConnected && !e.isConnected) {
        this.networkIsConnected = false
      } else if (!this.networkIsConnected && e.isConnected) {
        this.networkIsConnected = true
        this.reconnector.run()
      }
    })
  }
  /**
   * 事件监听、移除、触发
   */
  on(name, callback) {
    this.event.addListener(name, callback, this)
  }
  off(name, callback) {
    this.event.removeListener(name, callback, this)
  }
  emit(name, ...args) {
    this.event.emit(name, ...args)
  }
  /**
   * 开启连接
   */
  async connect(url) {
    if ([1 /* CONNECTED */, 2 /* ERROR */].includes(this.status)) {
      throw new Error('socket is already connected')
    }
    await this.getNetworkOnline()
    if (!this.networkIsConnected) {
      throw new Error('network is offline')
    }
    if (url && this.url !== url) {
      this.url = url
    }
    this.createConnect()
  }
  /**
   * 创建连接
   */
  createConnect() {
    if (this.reconnectLock) return
    this.socket = uni.connectSocket({
      url: this.url,
      success: (e) => console.log('ws success', e),
      fail: (e) => console.log('ws fail', e)
    })
    this.initOptions.reconnect && (this.reconnectOpen = true)
    this.socket.onOpen(this.handleOpen.bind(this))
    this.socket.onMessage(this.handelMessage.bind(this))
    this.socket.onError(this.handleError.bind(this))
    this.socket.onClose(this.handleClose.bind(this))
  }
  /**
   * 关闭连接
   */
  close() {
    this.status = 3 /* CLOSED */
    this.reconnectOpen = false
    this.socket && this.socket.close({})
  }
  /**
   * 重新连接
   */
  reconnect() {
    this.close()
    this.connect()
  }
  /**
   * 发送数据
   * @param {*} data
   */
  async send(data) {
    if (!this.socket || this.status !== 1 /* CONNECTED */) {
      throw new Error('socket is not connected')
    }
    data = await this.interceptor.run('send', data, this)
    if (typeof data === 'object' && !(data instanceof ArrayBuffer)) {
      data = JSON.stringify(data)
    }
    this.socket.send({ data })
  }
  /**
   * 基于模板发送数据
   * @param templateId 模板ID
   * @param data 数据
   */
  async sendByTemplate(templateId, data) {
    const templateIns = this.getTemplateIns(templateId)
    const templateData = templateIns.generate(templateId, data)
    this.send(templateData)
  }
  /**
   * 获取模板管理实例
   * @param templateId 模板ID
   * @returns
   */
  getTemplateIns(templateId) {
    return this.template.get(templateId) ? this.template : _WebsocketClient.template
  }
  /**
   * 订阅主题，可以自动发送订阅的模板消息，并在连接后进行自动订阅
   * @param {*} topic 订阅主题
   * @param {*} listener 监听函数
   */
  sub(topic, listener) {
    this.subCollection[topic] = this.subCollection[topic] ? this.subCollection[topic] + 1 : 1
    this.event.addListener(topic, listener, this)
    this.sendSub('sub', topic)
  }
  /**
   * 取消订阅
   * @param {*} topic 订阅主题
   * @param {*} listener 监听函数
   */
  unsub(topic, listener) {
    if (!this.subCollection[topic]) return
    this.subCollection[topic]--
    this.event.removeListener(topic, listener, this)
    this.sendSub('sub', topic)
  }
  /**
   * 发送订阅模板消息
   */
  async sendSub(action, topic) {
    if (!this.socket || this.status !== 1 /* CONNECTED */) return
    const templateIns = this.getTemplateIns(action)
    const tmpData = templateIns.generate(action, topic)
    const sendData = await this.interceptor.run(action, tmpData, this)
    this.send(sendData)
  }
  /**
   * socket连接成功
   */
  handleOpen() {
    this.reconnector.reset()
    this.status = 1 /* CONNECTED */
    this.event.emit('open', this)
    for (const key in this.subCollection) {
      !!key && this.sendSub('sub', key)
    }
  }
  /**
   * socket收到消息
   * @param {*} msg 数据
   */
  async handelMessage(msg) {
    let { data } = msg
    if (!(data instanceof ArrayBuffer)) {
      try {
        data = JSON.parse(data)
      } catch (error) {}
    }
    data = await this.interceptor.run('message', data, this)
    this.event.emit('message', data)
  }
  /**
   * socket发生错误
   * @param {*} err 错误对象
   */
  handleError(err) {
    this.status = 2 /* ERROR */
    this.event.emit('error', err)
  }
  /**
   * socket连接断开
   */
  async handleClose() {
    this.status = 3 /* CLOSED */
    this.event.emit('close')
    this.socket = null
    if (this.reconnectOpen) {
      this.event.emit('reconnect')
      this.reconnector.state = 0
      this.reconnector.delayRun()
    }
  }
  /**
   * 获取网络是否在线
   */
  getNetworkOnline() {
    return new Promise((resolve, reject) => {
      uni.getNetworkType({
        success: (res) => {
          const isOnline = res.networkType !== 'none'
          resolve((this.networkIsConnected = isOnline))
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}
var WebsocketClient = _WebsocketClient
// 拦截器
WebsocketClient.template = new WebsocketClientTemplate()
function normalizeOptions2(options) {
  const { reconnect, reconnectMaxCount, reconnectInterval } = options
  options.reconnect = reconnect === void 0 ? true : !!reconnect
  options.reconnectMaxCount = reconnectMaxCount === void 0 ? 5 : reconnectMaxCount
  options.reconnectInterval = reconnectInterval === void 0 ? 500 : reconnectInterval
  return options
}
export { WebsocketClient as default, normalizeOptions2 as normalizeOptions }
