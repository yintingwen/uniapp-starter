export class DateUtil {
  static format(value, format = 'YYYY-MM-DD HH:mm:ss') {
    if (typeof value === 'string' && /^\d+$/.test(value)) {
      value = Number(value)
    }
    return dayjs(value).format(format)
  }

  static formatMillisecond(millisecond) {
    millisecond = Number(millisecond)
    const second = Math.floor(millisecond / 1000)
    const minute = Math.floor(second / 60)
    const hour = Math.floor(minute / 60)
    const secondStr = `${second % 60}`.padStart(2, '0')
    const minuteStr = `${minute % 60}`.padStart(2, '0')
    const hourStr = `${hour % 24}`.padStart(2, '0')

    return `${hourStr}:${minuteStr}:${secondStr}`
  }

  /**
   * 获取时间段内的天数
   * @param {*} start
   * @param {*} hour
   * @returns { start: number, end: number, day: number }
   */
  static getIncludeDays(start, hour) {
    const startDay = dayjs(start)
    const endDay = dayjs(startDay.add(hour, 'hour').valueOf() - 1)
    const dayMillisecond = 24 * 60 * 60 * 1000
    const day =
      (endDay.startOf('day').valueOf() - startDay.startOf('day').valueOf()) / dayMillisecond + 1

    return {
      start: startDay.valueOf(),
      end: endDay.valueOf(),
      day
    }
  }

  /**
   * 获取过去几天0点的数组
   */
  static getPreviousDaysZeroArray(days) {
    const now = dayjs()
    const start = now.subtract(days, 'day')
    const result = []
    for (let i = 0; i < days; i++) {
      const day = start.add(i, 'day')
      result.push(day.startOf('day').valueOf())
    }
    return result
  }

  /**
   * 基于有限的月数量，获取年月map
   * @param {*} start 
   * @param {*} end 
   */
  static getYearMonthMapByFiniteMonth(startYear = dayjs().year(), startMonth = dayjs().month() + 1, limitMonth = 6) {
    const map = {}

    function getMonthList(year, month, num) {
      map[year] = []
      for (let i = 0; i < num; i++) {
        const pushMonth = month - i
        if (pushMonth) {
          map[year].push(pushMonth)
        } else {
          getMonthList(year - 1, 12, num - i)
        }
      }
    }
  
    getMonthList(startYear, startMonth, limitMonth)
    return map
  }
}
