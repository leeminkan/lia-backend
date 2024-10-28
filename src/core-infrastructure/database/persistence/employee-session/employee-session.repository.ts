import { BaseFilter } from '@core-common/base-filter.interface';
import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { BaseRepositoryInterface } from '@core-common/base-repository.interface';
import { EmployeeSession as EmployeeSessionEntity } from '@core-modules/employee-session/employee-session.entity';

export abstract class EmployeeSessionRepository extends BaseRepositoryInterface<EmployeeSessionEntity> {
  abstract findAndCountAllByEmployeeId(
    employeeId: number,
    params: FindAndCountAllEmployeeSessionParams,
  ): Promise<BasePaginationResult<EmployeeSessionEntity>>;
}

// TYPES
export type FindAndCountAllEmployeeSessionParams =
  BaseFilter<EmployeeSessionEntity>;
