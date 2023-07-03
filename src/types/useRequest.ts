export interface UseRequestService<Data, Params> {
  (...args: Params[]): Promise<Data>;
}

export interface UseRequestOptions<Data, Params> {
  manual?: boolean;
  defaultParams?: Params | Params[];
  defaultData?: Data;
  loadingDelay?: boolean;
  storageKey?: string;
}

export interface UseRequestResult<Data, Params> {
  data: Data;
  loading: boolean;
  params: Params[];
  run: (...args: Params[]) => Promise<Data>;
  refresh: () => Promise<Data>;
  cancel: () => Promise<Data>;
}