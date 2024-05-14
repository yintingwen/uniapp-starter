import { UsePaginationParamsTransformer, UsePaginationResultTransformer } from "../usePagination";

export interface HookConfig {
  usePagination: UsePaginationConfig;
}

export interface UsePaginationConfig {
  paramsTransformer: UsePaginationParamsTransformer;
  resultTransformer: UsePaginationResultTransformer;
}