import { plainToInstance } from 'class-transformer';

import { CustomerSession as CustomerSessionDomainEntity } from '@core-modules/customer-session/customer-session.entity';

import { BaseMapper } from '../base.mapper';
import { CustomerSession as CustomerSessionInfrastructureEntity } from './customer-session-typeorm.entity';

export class CustomerSessionMapper
  implements
    BaseMapper<
      CustomerSessionDomainEntity,
      CustomerSessionInfrastructureEntity
    >
{
  mapToORM(
    customerDomainEntity: CustomerSessionDomainEntity,
  ): CustomerSessionInfrastructureEntity {
    const orm = new CustomerSessionInfrastructureEntity();
    orm.id = customerDomainEntity.id;
    orm.customerId = customerDomainEntity.customerId;
    orm.hash = customerDomainEntity.hash;
    orm.isLogout = customerDomainEntity.isLogout;
    orm.createdAt = customerDomainEntity.createdAt!;
    return orm;
  }

  mapToDomain(
    customerInfraEntity: CustomerSessionInfrastructureEntity,
  ): CustomerSessionDomainEntity {
    return plainToInstance(CustomerSessionDomainEntity, {
      id: customerInfraEntity.id,
      customerId: customerInfraEntity.customerId,
      hash: customerInfraEntity.hash,
      isLogout: customerInfraEntity.isLogout,
      createdAt: customerInfraEntity.createdAt,
    });
  }
}
