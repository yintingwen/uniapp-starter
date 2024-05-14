import { defineStore } from 'pinia'

export const useCarStore = defineStore('car', {
  state: () => ({
    gridPosition: {},
    gridTrack: [],
    locationMap: { type: '', carNo: '', data: {} },
    trackMap: { type: '', carNo: '', dataSource: 0, data: [] }
  }),
  actions: {
    /**
     * 搜索网格车辆位置
     * @param {*} carNumber
     * @param {*} carType
     * @returns
     */
    async searchGridPosition(carNumber, carType) {
      const data = await carApi.gridLocationSearch({
        carNo: carNumber,
        carNoColor: carType
      })
      this.gridPosition = data || {}
      return data
    },
    /**
     * 搜索网格车辆轨迹
     * @param {*} carNo
     * @returns
     */
    async searchGridTrack(carNumber, day, start, end) {
      const carNoColor = carNumber.length === 8 ? 3 : 2 // 8位车牌为新能源车，7位为黄色车牌
      const { girdTrackArray } = await carApi.gridTrackSearch({
        carNo: carNumber,
        carNoColor,
        daysBetween: day,
        qryBtm: start,
        qryEtm: end
      })
      this.gridTrack = girdTrackArray || []
      return girdTrackArray
    },
    /**
     * 更新精准定位数据
     */
    async updateLocationMap(type, carNo, data) {
      this.locationMap = { type, carNo, data }
    },
    /**
     * 更新精准轨迹数据
     */
    async updateTrackMap(type, carNo, data, dataSource) {
      this.trackMap = { type, carNo, data, dataSource}
    }
  }
})
