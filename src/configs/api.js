// needLogin: 是否需要登录
// extract: 是否需要提取数据
// includeCode: 包含的错误码，在该错误码内不会拦截响应
export const ApiConfig = {
  '/user/login': {
    needLogin: false
  },
  '/position/positionSpeedQuery': {
    extract: false
  },
  '/position/positionAccurateQuery': {
    extract: false
  },
  '/track/trackSpeedQuery': {
    extract: false,
    includeCode: [
      RESPONSE_CODE_UAER_NO_REAL,
      RESPONSE_CODE_USER_REAL_TIMEOUT,
      RESPONSE_CODE_USER_VEHICLE_ERROR
    ]
  },
  '/track/trackAccurateQuery': {
    extract: false
  }
}
