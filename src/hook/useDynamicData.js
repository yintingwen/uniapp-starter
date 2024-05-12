/**
 * @description: 动态获取数组中的数据，根据下标变动
 * @param {*} data
 * @param {*} index
 * @returns
 */
export function useDynamicDataForArray(data, index = 0) {
  if (!Array.isArray(data)) {
    throw new Error('useDynamicDataByArray: data must be an array')
  }
  const indexIsRef = typeof index === 'object' && index !== null && typeof index.value === 'number'
  let dyunamicIndex = indexIsRef ? index.value : index
  const netaArray = data
  const value = reactive({ ...netaArray[dyunamicIndex] })

  if (indexIsRef) {
    watch(
      () => index.value,
      (value) => {
        setIndex(value)
      }
    )
  }

  function setIndex(index) {
    if (index >= netaArray.length) {
      throw new Error('useDynamicDataByArray: index must be less than data.length')
    }
    if (index === dyunamicIndex) return
    const metaData = netaArray[dyunamicIndex]
    Object.assign(metaData, value)
    dyunamicIndex = index
    Object.assign(value, netaArray[dyunamicIndex])
  }

  return {
    value,
    setIndex
  }
}
