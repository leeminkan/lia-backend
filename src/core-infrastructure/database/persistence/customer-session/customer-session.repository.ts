import { BaseFilter } from '@core-common/base-filter.interface';
import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { BaseRepositoryInterface } from '@core-common/base-repository.interface';
import { CustomerSession as CustomerSessionEntity } from '@core-modules/customer-session/customer-session.entity';

export abstract class CustomerSessionRepository extends BaseRepositoryInterface<CustomerSessionEntity> {
  abstract findAndCountAllByCustomerId(
    customerId: number,
    params: FindAndCountAllCustomerSessionParams,
  ): Promise<BasePaginationResult<CustomerSessionEntity>>;
}

// TYPES
export type FindAndCountAllCustomerSessionParams =
  BaseFilter<CustomerSessionEntity>;
