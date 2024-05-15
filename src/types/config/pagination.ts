export interface PaginationConfig extends Pagination {
  size: number;
  paramsTransformer: UsePaginationParamsTransformer;
  resultTransformer: UsePaginationResultTransformer;
}

export interface Pagination {
  current: number;
  size: number;
  sizeOptions: number[];
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
