import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsOrder, Repository } from 'typeorm';

import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { EmployeeSession as EmployeeSessionDomainEntity } from '@core-modules/employee-session/employee-session.entity';

import { BaseRepository } from '../base.repository';
import { EmployeeSession as EmployeeSessionInfrastructureEntity } from './employee-session-typeorm.entity';
import { EmployeeSessionMapper } from './employee-session.mapper';
import {
  EmployeeSessionRepository,
  FindAndCountAllEmployeeSessionParams,
} from './employee-session.repository';

@Injectable()
export class EmployeeSessionRepositoryImpl
  extends BaseRepository<
    EmployeeSessionDomainEntity,
    EmployeeSessionInfrastructureEntity
  >
  implements EmployeeSessionRepository
{
  constructor(
    @InjectRepository(EmployeeSessionInfrastructureEntity)
    private readonly employeeRepo: Repository<EmployeeSessionInfrastructureEntity>,
  ) {
    super(new EmployeeSessionMapper(), employeeRepo);
  }

  async findAndCountAllByEmployeeId(
    employeeId: number,
    {
      page = 1,
      perPage = 10,
      orderBy,
      orderDirection,
    }: FindAndCountAllEmployeeSessionParams,
  ): Promise<BasePaginationResult<EmployeeSessionDomainEntity>> {
    const findOptions = {
      where: {
        employeeId,
      },
    } as FindManyOptions<EmployeeSessionInfrastructureEntity>;

    if (page && perPage) {
      findOptions.skip = (page - 1) * perPage;
      findOptions.take = perPage;
    }

    if (orderBy && orderDirection) {
      findOptions.order = {
        [orderBy]: orderDirection,
      } as FindOptionsOrder<EmployeeSessionInfrastructureEntity>;
    }

    const [result, countEntities] = await Promise.all([
      this.repository.find(findOptions),
      this.repository.count(findOptions),
    ]);

    return {
      data: result.map((entity) => this.mapper.mapToDomain(entity)),
      metadata: {
        page,
        perPage,
        totalPages: Math.ceil(countEntities / perPage),
        totalItems: countEntities,
      },
    };
  }
}
