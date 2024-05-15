/**
 * @type { import('../types/config/pagination').PaginationConfig }
 */
export const paginationConfig = {
  /**
   * 默认的分页大小
   */
  size: 20,
  /**
   * 将hook的字段装换为接口的字段进行请求
   */
  paramsTransformer: (e) => ({
    page: e.pageNo,
    limit: e.pageSize,
  }),
  /**
   * 将接口返回的结果转换为hook使用的字段
   */
  resultTransformer: (e) => ({
    data: e.data,
    total: e.total,
  }),
}
