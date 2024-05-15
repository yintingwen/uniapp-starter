export const coPageFillTypeEnum = {
  NONE: 1, // 不撑满
  PAGE: 2, // 页面撑满，内容自适应
  BODY: 3, // 页面撑满，内容撑满
}

export const coPageFillTypeStyleEnum = {
  [coPageFillTypeEnum.NONE]: 'height',
  [coPageFillTypeEnum.PAGE]: 'min-height',
  [coPageFillTypeEnum.BODY]: 'height',
}
