export interface UsePagePagination {
  (UsePagePaginationService, UsePagePaginationOption): UsePagePaginationResult;
}

/**
 * 分页服务函数
 */
export interface UsePagePaginationService {
  (...args): Promise<any>;
}

/**
 * 分页选项
 */
export interface UsePagePaginationOption {
  pageSize: number;
  pageNo: number;
  loading: boolean;
  manual: boolean;
  showRefresh: boolean;
  incrementalRefresh: number;
  paramsTransformer: (e: Pagination) => Record<string, any>;
  resultTransformer: (e: Record<string, any>) => Record<string, any>
}

/**
 * 分页hook结果
 */
export interface UsePagePaginationResult {
  value: any[];
  pagination: Pagination;
  next: (...args) => Promise<any>
}

/**
 * 分页对象
 */
export interface Pagination {
  pageNo: number;
  pageSize: number;
  total: number;
}

export interface UsePaginationParamsTransformer {
  (e: Pagination): any
}

export interface UsePaginationResultTransformer {
  (e: any): {
    data: any,
    total: number
  }
}

