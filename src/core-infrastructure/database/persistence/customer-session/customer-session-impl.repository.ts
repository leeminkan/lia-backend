import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsOrder, Repository } from 'typeorm';

import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { CustomerSession as CustomerSessionDomainEntity } from '@core-modules/customer-session/customer-session.entity';

import { BaseRepository } from '../base.repository';
import { CustomerSession as CustomerSessionInfrastructureEntity } from './customer-session-typeorm.entity';
import { CustomerSessionMapper } from './customer-session.mapper';
import {
  CustomerSessionRepository,
  FindAndCountAllCustomerSessionParams,
} from './customer-session.repository';

@Injectable()
export class CustomerSessionRepositoryImpl
  extends BaseRepository<
    CustomerSessionDomainEntity,
    CustomerSessionInfrastructureEntity
  >
  implements CustomerSessionRepository
{
  constructor(
    @InjectRepository(CustomerSessionInfrastructureEntity)
    private readonly customerRepo: Repository<CustomerSessionInfrastructureEntity>,
  ) {
    super(new CustomerSessionMapper(), customerRepo);
  }

  async findAndCountAllByCustomerId(
    customerId: number,
    {
      page = 1,
      perPage = 10,
      orderBy,
      orderDirection,
    }: FindAndCountAllCustomerSessionParams,
  ): Promise<BasePaginationResult<CustomerSessionDomainEntity>> {
    const findOptions = {
      where: {
        customerId,
      },
    } as FindManyOptions<CustomerSessionInfrastructureEntity>;

    if (page && perPage) {
      findOptions.skip = (page - 1) * perPage;
      findOptions.take = perPage;
    }

    if (orderBy && orderDirection) {
      findOptions.order = {
        [orderBy]: orderDirection,
      } as FindOptionsOrder<CustomerSessionInfrastructureEntity>;
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
