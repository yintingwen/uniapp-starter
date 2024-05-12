const http = uni.$u.http

export class CarApi {
  // 车辆定位是否查询过
  static locationIsSearch = (params) => http.get('/position/carNoIsQuery', { params })
  // 网格定位查询
  static gridLocationSearch = (data) => http.post('/position/positionSpeedQuery', data)
  // 网格轨迹查询
  static gridTrackSearch = (data) => http.post('/track/trackSpeedQuery', data)
  // 精准定位查询
  static preciseLocationSearch = (data) => http.post('/position/positionAccurateQuery', data)
  // 精准轨迹查询
  static preciseTrackSearch = (data) => http.post('/track/trackAccurateQuery', data)
  // 网格定位查询记录
  static gridLocationSearchHistory = (data) => http.post('/position/speedRecordQuery', data)
  // 精准定位查询记录
  static preciseLocationSearchHistory = (data) => http.post('/position/accurateRecordQuery', data)
  // 网格轨迹查询记录
  static gridTrackSearchHistory = (data) => http.post('/track/speedRecordQuery', data)
  // 精准轨迹查询记录
  static preciseTrackSearchHistory = (data) => http.post('/track/accurateRecordQuery', data)
  // 网格轨迹查车记录详情
  static gridTrackSearchHistoryDetail = (params) => http.get('/track/speedRecordDetailQuery', { params })
  // 精准轨迹查车记录详情
  static preciseTrackSearchHistoryDetail = (params) => http.get('/track/accurateRecordDetailQuery', { params })
}
