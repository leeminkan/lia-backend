export interface BasePaginationResult<TEntity> {
  metadata: {
    totalItems: number;
    totalPages: number;
    page: number;
    perPage: number;
  };
  data: TEntity[];
}
