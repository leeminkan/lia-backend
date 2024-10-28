import { BaseFilter } from '@core-common/base-filter.interface';
import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { BaseRepositoryInterface } from '@core-common/base-repository.interface';
import { Nullable } from '@core-common/utils/types';
import { Employee as EmployeeEntity } from '@core-modules/employee/employee.entity';

export abstract class EmployeeRepository extends BaseRepositoryInterface<EmployeeEntity> {
  abstract findAndCountAll(
    params: FindAndCountAllEmployeeParams,
  ): Promise<BasePaginationResult<EmployeeEntity>>;

  abstract findByUsername(username: string): Promise<Nullable<EmployeeEntity>>;
}

// TYPES
export type FindAndCountAllEmployeeParams = BaseFilter<EmployeeEntity> & {
  search?: string;
};
