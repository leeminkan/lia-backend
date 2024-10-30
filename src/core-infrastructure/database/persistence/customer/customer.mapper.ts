import { plainToInstance } from 'class-transformer';

import { Customer as CustomerDomainEntity } from '@core-modules/customer/customer.entity';

import { BaseMapper } from '../base.mapper';
import { Customer as CustomerInfrastructureEntity } from './customer-typeorm.entity';

export class CustomerMapper
  implements BaseMapper<CustomerDomainEntity, CustomerInfrastructureEntity>
{
  mapToORM(
    customerDomainEntity: CustomerDomainEntity,
  ): CustomerInfrastructureEntity {
    const orm = new CustomerInfrastructureEntity();
    orm.id = customerDomainEntity.id;
    orm.username = customerDomainEntity.username;
    orm.password = customerDomainEntity.password;
    orm.createdAt = customerDomainEntity.createdAt!;
    return orm;
  }

  mapToDomain(
    customerInfraEntity: CustomerInfrastructureEntity,
  ): CustomerDomainEntity {
    return plainToInstance(CustomerDomainEntity, {
      id: customerInfraEntity.id,
      username: customerInfraEntity.username,
      password: customerInfraEntity.password,
      createdAt: customerInfraEntity.createdAt,
    });
  }
}
