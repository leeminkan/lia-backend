import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsOrder, ILike, Repository } from 'typeorm';

import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { Nullable } from '@core-common/utils/types';
import { Employee as EmployeeDomainEntity } from '@core-modules/employee/employee.entity';

import { BaseRepository } from '../base.repository';
import { Employee as EmployeeInfrastructureEntity } from './employee-typeorm.entity';
import { EmployeeMapper } from './employee.mapper';
import {
  EmployeeRepository,
  FindAndCountAllEmployeeParams,
} from './employee.repository';

@Injectable()
export class EmployeeRepositoryImpl
  extends BaseRepository<EmployeeDomainEntity, EmployeeInfrastructureEntity>
  implements EmployeeRepository
{
  constructor(
    @InjectRepository(EmployeeInfrastructureEntity)
    private readonly employeeRepo: Repository<EmployeeInfrastructureEntity>,
  ) {
    super(new EmployeeMapper(), employeeRepo);
  }

  async findAndCountAll({
    page = 1,
    perPage = 10,
    orderBy,
    orderDirection,
    search,
  }: FindAndCountAllEmployeeParams): Promise<
    BasePaginationResult<EmployeeDomainEntity>
  > {
    const findOptions = {
      where: {
        ...(search && {
          username: ILike(`%${search}%`),
        }),
      },
    } as FindManyOptions<EmployeeInfrastructureEntity>;

    if (page && perPage) {
      findOptions.skip = (page - 1) * perPage;
      findOptions.take = perPage;
    }

    if (orderBy && orderDirection) {
      findOptions.order = {
        [orderBy]: orderDirection,
      } as FindOptionsOrder<EmployeeInfrastructureEntity>;
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
  async findByUsername(
    username: string,
  ): Promise<Nullable<EmployeeDomainEntity>> {
    const employee = await this.repository.findOneBy({ username });

    if (!employee) {
      return null;
    }

    return this.mapper.mapToDomain(employee);
  }
}
