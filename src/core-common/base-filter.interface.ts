export interface BaseFilter<T> {
  page?: number;
  perPage?: number;
  orderBy?: keyof T;
  orderDirection?: 'asc' | 'desc';
}
