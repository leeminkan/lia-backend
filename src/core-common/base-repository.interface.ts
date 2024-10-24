export abstract class BaseRepositoryInterface<TEntity> {
  abstract create(entity: Omit<TEntity, 'id'>): Promise<TEntity>;
  abstract findById(id: number | string): Promise<TEntity | null>;
  abstract update(entity: TEntity): Promise<TEntity | null>;
  abstract delete(id: number | string): Promise<boolean>;
}
