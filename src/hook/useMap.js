import QQMapWX from '@/lib/qqmap-wx-jssdk.min'


// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: import.meta.env.VITE_MAP_KEY
})

/**
 * 网格定位
 */
export function useMapGridLocation(location) {
  const value = reactive({})
  let metaMarkers = []

  location && update(location)

  function update(data) {
    Object.assign(value, getLocationBase(data))
    value.longitude = getGridCenter(data.girdLeftLng, data.gridRightLng)
    value.latitude = getGridCenter(data.girdLeftLat, data.girdRightLat)
    value.scale = 12
    value.locationInfo = data.girdProvince + data.girdCity + data.girdCountry + '****'
    value.circles = [
      {
        longitude: value.longitude,
        latitude: value.latitude,
        radius: 3000,
        color: '#5277fd',
        fillColor: '#5277fd30',
        strokeWidth: 1,
        level: 'aboveroads'
      }
    ]
    if (!metaMarkers.length) {
      metaMarkers = [
        {
          id: 1,
          longitude: value.longitude,
          latitude: value.latitude,
          iconPath: '',
          height: 1,
          width: 1,
          customCallout: {
            anchorY: 1 + 10.5,
            display: 'ALWAYS'
          }
        }
      ]
    }
    value.markers = metaMarkers
  }

  function onMapRegionChange(e) {
    if (e.type === 'begin') return
    if (e.detail.scale > 12.5) {
      value.markers = []
    } else {
      value.markers = metaMarkers
    }
  }

  return {
    value,
    update,
    onMapRegionChange
  }
}

/**
 * 定准定位
 */
export function useMapPreciseLocation(location) {
  const value = reactive({})
  location && update(location)

  async function update(data) {
    Object.assign(value, getLocationBase(data))
    value.longitude = data.lon / 600000
    value.latitude = data.lat / 600000
    value.scale = 12
    value.online = data.offlineState === 'false'
    value.markers = [
      {
        id: 2,
        longitude: value.longitude,
        latitude: value.latitude,
        iconPath: '',
        width: 70,
        height: 70,
        rotate: Number(data.drc),
        anchor: { x: 0.5, y: 0.5 }
      }
    ]
    value.locationInfo = data.adr
  }

  return {
    value,
    update
  }
}

/**
 * 模糊轨迹
 */
export function useMapGridTrack(trackArray, initSpeed = 1) {
  let timer = null
  const useData = reactive({
    longitude: 0, // 经度
    latitude: 0, // 维度
    scale: 9.5, // 缩放
    startTime: 0, // 起始时间
    endTime: 0, // 结束时间
    startAreaString: '', // 起始地区字符串
    endAreaString: '', // 结束地区字符串
    markers: [], // 起点，重点圆点
    polyline: [
      // 线，动画用
      {
        color: '#166cfd',
        width: 3,
        points: []
      }
    ],
    circles: [], // 圆，动画用
    speed: initSpeed, // 速度，动画用
    currentTime: 0, // 当前时间，动画用
    drivingTime: 0, // 当前行驶时长，动画用
    playIndex: 0, // 播放下标，动画用
    playing: false, // 正在播放，动画用
    enableReplay: false // 是否重放
  })

  const cacheCircles = []
  const cachePoints = []
  const cacheMarkers = []

  trackArray.map((item, index) => {
    const longitude = getGridCenter(item.girdLeftLng, item.girdRightLng)
    const latitude = getGridCenter(item.girdLeftLat, item.girdRightLat)
    cachePoints.push({ longitude, latitude })
    cacheCircles.push({
      longitude,
      latitude,
      radius: 2500,
      color: '#5277fd',
      fillColor: '#5277fd30',
      strokeWidth: 1
    })
    cacheMarkers.push({
      id: index,
      longitude: longitude,
      latitude: latitude,
      iconPath: getTrackMarkerIcon(index, trackArray),
      height: 25,
      width: 25,
      alpha: index > 0 && index < trackArray.length - 1 ? 0 : 1,
      display: 'ALWAYS',
      anchor: {
        x: 0.5,
        y: 0.5
      }
    })
    useData.polyline[0].points = [...cachePoints]
    useData.circles = [...cacheCircles]
    useData.markers = [...cacheMarkers]
  })
  const startTrack = trackArray[0]
  const endTrack = trackArray[trackArray.length - 1]
  const startPoint = cachePoints[0]
  const endPoint = cachePoints[cachePoints.length - 1]

  useData.longitude = (startPoint.longitude + endPoint.longitude) / 2
  useData.latitude = (startPoint.latitude + endPoint.latitude) / 2

  useData.startTime = dateUtil.format(startTrack.enterGirdTime)
  useData.endTime = dateUtil.format(endTrack.exitGirdTime, 'YYYY/MM/DD HH:mm:ss')
  useData.startAreaString = startTrack.girdLeftProvince + startTrack.girdLeftCity + startTrack.girdLeftCountry + '****'
  useData.endAreaString = endTrack.girdLeftProvince + endTrack.girdLeftCity + endTrack.girdLeftCountry + '****'

  const diffLng = Math.abs(startPoint - endPoint.longitude)
  const diffLat = Math.abs(startPoint.latitude - endPoint.latitude)
  const diff = diffLng > diffLat ? diffLng : diffLat
  useData.scale = 9.5 - diff * 1

  watch(
    () => useData.playIndex,
    (e) => {
      useData.enableReplay && setDataByIndex(e)
    }
  )

  function play() {
    // 播放到了最后一帧，重置到0
    if (useData.playIndex === cachePoints.length - 1) {
      useData.playIndex = 0
      reset()
    }

    useData.enableReplay = false
    useData.playing = true

    setDataByIndex(useData.playIndex)
    timer = setTimeout(() => runAnimation(++useData.playIndex), 300 / useData.speed)
  }

  function pause() {
    clearTimeout(timer)
    useData.enableReplay = true
    useData.playing = false
  }

  function reset() {
    clearTimeout(timer)
    useData.enableReplay = false
    useData.playIndex = 0
    useData.playing = false
    useData.polyline[0].points = [...cachePoints]
    useData.circles = [...cacheCircles]
    useData.currentTime = 0
    useData.drivingTime = 0
  }

  function setDataByIndex(index) {
    useData.polyline[0].points = index ? cachePoints.slice(0, index + 1) : []
    useData.circles = cacheCircles.slice(0, index + 1)
    useData.currentTime = dayjs(trackArray[index].exitGirdTime).valueOf()
    trackArray.slice(0, index + 1).forEach((item) => {
      useData.drivingTime += dayjs(item.exitGirdTime).valueOf() - dayjs(item.enterGirdTime).valueOf()
    })
  }

  function runAnimation(index) {
    const targetTrack = trackArray[index]

    useData.polyline[0].points = cachePoints.slice(0, index + 1)
    useData.circles.push(cacheCircles[index])
    useData.currentTime = dayjs(targetTrack.exitGirdTime).valueOf()
    useData.drivingTime += dayjs(targetTrack.exitGirdTime).valueOf() - dayjs(targetTrack.enterGirdTime).valueOf()
    if (useData.playIndex + 1 === cachePoints.length) {
      useData.playing = false
    } else {
      timer = setTimeout(() => runAnimation(++useData.playIndex), 300 / useData.speed)
    }
  }

  return {
    value: useData,
    play,
    pause,
    reset
  }
}

/**
 * 精准轨迹
 */
export function useMapPreciseTrack(trackArray, initSpeed = 1, mapId) {
  // 地图实例
  let mapCtx = null
  // 地图车辆显示点
  let carPoint = null
  // 地图车辆初始角度
  const carRotate = Number(trackArray[0].agl)
  // 缓存的路径点
  const cachePoints = []
  // 缓存的图标点
  const cacheMarkers = []
  // 轨迹边界经纬度
  let leftLng = 0
  let rightLng = 0
  let topLat = 0
  let bottomLat = 0
  // 地图使用数据
  const useData = reactive({
    longitude: 0, // 经度
    latitude: 0, // 维度
    scale: 7, // 缩放
    startTime: dayjs(trackArray[0].gtm, 'YYYYMMDD/HHmmss').format('YYYY-MM-DD HH:mm:ss'), // 起始时间
    endTime: dayjs(trackArray[trackArray.length - 1].gtm, 'YYYYMMDD/HHmmss').format('YYYY-MM-DD HH:mm:ss'), // 结束时间
    startAreaString: '', // 起始地区字符串
    endAreaString: '', // 结束地区字符串
    markers: [], // 起点，重点圆点
    polyline: [
      // 线，动画用
      {
        color: '#166cfd',
        width: 3,
        points: []
      }
    ],
    speed: initSpeed, // 速度，动画用
    currentTime: 0, // 当前时间，动画用
    playIndex: 0, // 播放下标，动画用
    playing: false, // 正在播放，动画用
    enableAnimation: false // 是否启动动画
  })

  // 获取地图实例
  onMounted(() => {
    mapCtx = wx.createMapContext(mapId, getCurrentInstance())
  })

  // 格式化路径点和图标点
  trackArray.map((item, index) => {
    const longitude = parseFloat((Number(item.lon) / 600000).toFixed(6))
    const latitude = parseFloat((Number(item.lat) / 600000).toFixed(6))
    cachePoints.push({ longitude, latitude })

    // 计算最边境的经纬度
    if (leftLng > longitude || leftLng === 0) leftLng = longitude
    if (rightLng < longitude || rightLng === 0) rightLng = longitude
    if (topLat < latitude || topLat === 0) topLat = latitude
    if (bottomLat > latitude || bottomLat === 0) bottomLat = latitude

    if (index === 0 || index === trackArray.length - 1) {
      const marker = {
        id: index + 1,
        longitude,
        latitude,
        iconPath: getTrackMarkerIcon(index, trackArray),
        height: 20,
        width: 20,
        alpha: 1,
        display: 'ALWAYS',
        anchor: {
          x: 0.5,
          y: 0.5
        }
      }
      cacheMarkers.push({ ...marker })
      if (index !== 0) return
      carPoint = {
        ...marker,
        id: trackArray.length + 1,
        iconPath: '',
        width: 50,
        height: 50,
        rotate: Number(item.agl),
        zIndex: 999
      }
    }
  })

  useData.polyline[0].points = [...cachePoints]
  useData.markers = [...cacheMarkers]
  // 设置地图中心点
  useData.longitude = (leftLng + rightLng) / 2
  useData.latitude = (topLat + bottomLat) / 2

  getBothEndsAreaString()

  /**
   * 播放，从当前帧开始，或者指定帧数开始，或者到结尾后从头开始
   * @param {*} step 指定帧数
   */
  function play(step) {
    // 播放到了最后一帧，重置到0
    if (typeof step === 'number' || useData.playIndex === cachePoints.length - 1) {
      skip(step || 0)
    }
    // 如果没有开启动画，先开启动画，插入小车
    if (!useData.enableAnimation) {
      useData.playIndex = 0
      enableAnimation()
    }
    useData.playing = true
    runAnimation(++useData.playIndex)
  }

  /**
   * 暂停，停止动画继续播放
   */
  function pause() {
    useData.playing = false
  }

  /**
   * 停止，停止动画，移除小车
   */
  function stop() {
    disableAnimation()
    pause()
  }

  /**
   * 跳跃到指定帧
   */
  function skip(index) {
    if (!useData.enableAnimation) return
    useData.playIndex = index === undefined ? useData.playInde : index
    useData.currentTime = dayjs(trackArray[index].gtm, 'YYYYMMDD/HHmmss').valueOf()
    mapCtx.translateMarker({
      markerId: carPoint.id,
      destination: cachePoints[useData.playIndex],
      autoRotate: false,
      rotate: getMarkerRotate(useData.playIndex),
      duration: 0,
      moveWithRotate: true
    })
  }

  /**
   * 开启动画，会自动插入车辆图片
   */
  function enableAnimation() {
    useData.enableAnimation = true
    mapCtx.addMarkers({
      markers: [carPoint]
    })
  }

  /**
   * 关闭动画，移除车辆icon
   * 动画播放中不会移除，只会将tag关闭，在map动画结束后自动移除icon
   * 动画暂停中则会直接移除icon
   */
  function disableAnimation() {
    useData.enableAnimation = false
    !useData.playing &&
      mapCtx.removeMarkers({
        markerIds: [0]
      })
  }

  function getMarkerRotate(index) {
    const pointRotate = Number(trackArray[index].agl)
    const rotateDiff = pointRotate - carRotate
    return rotateDiff > 0 ? rotateDiff : rotateDiff + 360
  }

  function runAnimation(index) {
    if (checkPointWithoutDistance(index, index - 1)) {
      return runAnimation(++useData.playIndex)
    }

    useData.currentTime = dayjs(trackArray[index].gtm, 'YYYYMMDD/HHmmss').valueOf()

    mapCtx.translateMarker({
      markerId: carPoint.id,
      destination: cachePoints[index],
      autoRotate: false,
      duration: 100 / useData.speed,
      moveWithRotate: true,
      rotate: getMarkerRotate(index),
      animationEnd: () => {
        if (!useData.enableAnimation) {
          // 动画关闭，直接移除icon
          disableAnimation()
        } else if (useData.playIndex + 1 === cachePoints.length) {
          // 动画开启，播放到最后一帧，停止
          useData.playing = false
        } else if (useData.playing) {
          // 动画开启，播放中，继续播放
          runAnimation(++useData.playIndex)
        }
      }
    })
  }

  /**
   * 获取起始点和结束点的地区字符串
   */
  function getBothEndsAreaString() {
    const areaList = [cachePoints[0], cachePoints[cachePoints.length - 1]]
    areaList.forEach((item, index) => {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: item.latitude,
          longitude: item.longitude
        },
        success: (res, data) => {
          if (index === 0) {
            useData.startAreaString = res.result.address
          } else {
            useData.endAreaString = res.result.address
          }
        }
      })
    })
  }

  /**
   * 校验两个点是否相同
   * @param {*} newIndex
   * @param {*} preIndex
   * @returns
   */
  function checkPointWithoutDistance(newIndex, preIndex) {
    const prePoint = trackArray[preIndex]
    const currentPotint = trackArray[newIndex]

    return prePoint.lat === currentPotint.lat && prePoint.lon === currentPotint.lon
  }

  return {
    value: useData,
    play,
    pause,
    stop,
    skip,
    enableAnimation,
    disableAnimation
  }
}

/**
 * 获取方向字符串
 */
function getDirectionString(drc) {
  const direction = Number(drc)
  if (direction > 0 && direction < 90) return '东北'
  if (direction === 90) return '正东'
  if (direction > 90 && direction < 180) return '东南'
  if (direction === 180) return '正南'
  if (direction > 180 && direction < 270) return '西南'
  if (direction === 270) return '正西'
  if (direction > 270 && direction <= 359) return '西北'
  return '未知'
}

/**
 * 获取网格中心经纬度
 */
function getGridCenter(left, right) {
  return (Number(left) / 600000 + Number(right) / 600000) / 2
}

/**
 * 获取轨迹启点终点图标
 */
function getTrackMarkerIcon(index, list) {
  if (index === 0) return 'https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/map/start.png'
  if (index === list.length - 1) return 'https://jxgk-front-images.oss-cn-hangzhou.aliyuncs.com/truck-tool/map/end.png'
  return undefined
}

function getLocationBase(location) {
  return {
    online: Number(location.spd) !== 0,
    speed: location.spd,
    direction: getDirectionString(location.drc),
    updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
}
