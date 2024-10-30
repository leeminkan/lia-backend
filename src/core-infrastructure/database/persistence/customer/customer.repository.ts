import { BaseFilter } from '@core-common/base-filter.interface';
import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { BaseRepositoryInterface } from '@core-common/base-repository.interface';
import { Nullable } from '@core-common/utils/types';
import { Customer as CustomerEntity } from '@core-modules/customer/customer.entity';

export abstract class CustomerRepository extends BaseRepositoryInterface<CustomerEntity> {
  abstract findAndCountAll(
    params: FindAndCountAllCustomerParams,
  ): Promise<BasePaginationResult<CustomerEntity>>;

  abstract findByUsername(username: string): Promise<Nullable<CustomerEntity>>;
}

// TYPES
export type FindAndCountAllCustomerParams = BaseFilter<CustomerEntity> & {
  search?: string;
};
