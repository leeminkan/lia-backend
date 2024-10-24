import { BaseFilter } from '@core-common/base-filter.interface';
import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { BaseRepositoryInterface } from '@core-common/base-repository.interface';
import { User as UserEntity } from '@core-modules/user/user.entity';

export abstract class UserRepository extends BaseRepositoryInterface<UserEntity> {
  abstract findAndCountAll(
    params: FindAndCountAllUserParams,
  ): Promise<BasePaginationResult<UserEntity>>;
}

// TYPES
export type FindAndCountAllUserParams = BaseFilter<UserEntity>;
