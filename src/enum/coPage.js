export const coPageFillTypeEnum = {
  none: 1, // 不撑满
  page: 2, // 页面撑满，内容自适应
  body: 3, // 页面撑满，内容撑满
}

export const coPageFillTypeStyleEnum = {
  [coPageFillTypeEnum.none]: 'height',
  [coPageFillTypeEnum.page]: 'min-height',
  [coPageFillTypeEnum.body]: 'height',
}
