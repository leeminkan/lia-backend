import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsOrder, ILike, Repository } from 'typeorm';

import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { Nullable } from '@core-common/utils/types';
import { Customer as CustomerDomainEntity } from '@core-modules/customer/customer.entity';

import { BaseRepository } from '../base.repository';
import { Customer as CustomerInfrastructureEntity } from './customer-typeorm.entity';
import { CustomerMapper } from './customer.mapper';
import {
  CustomerRepository,
  FindAndCountAllCustomerParams,
} from './customer.repository';

@Injectable()
export class CustomerRepositoryImpl
  extends BaseRepository<CustomerDomainEntity, CustomerInfrastructureEntity>
  implements CustomerRepository
{
  constructor(
    @InjectRepository(CustomerInfrastructureEntity)
    private readonly customerRepo: Repository<CustomerInfrastructureEntity>,
  ) {
    super(new CustomerMapper(), customerRepo);
  }

  async findAndCountAll({
    page = 1,
    perPage = 10,
    orderBy,
    orderDirection,
    search,
  }: FindAndCountAllCustomerParams): Promise<
    BasePaginationResult<CustomerDomainEntity>
  > {
    const findOptions = {
      where: {
        ...(search && {
          username: ILike(`%${search}%`),
        }),
      },
    } as FindManyOptions<CustomerInfrastructureEntity>;

    if (page && perPage) {
      findOptions.skip = (page - 1) * perPage;
      findOptions.take = perPage;
    }

    if (orderBy && orderDirection) {
      findOptions.order = {
        [orderBy]: orderDirection,
      } as FindOptionsOrder<CustomerInfrastructureEntity>;
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
  ): Promise<Nullable<CustomerDomainEntity>> {
    const customer = await this.repository.findOneBy({ username });

    if (!customer) {
      return null;
    }

    return this.mapper.mapToDomain(customer);
  }
}
