import { plainToInstance } from 'class-transformer';

import { EmployeeSession as EmployeeSessionDomainEntity } from '@core-modules/employee-session/employee-session.entity';

import { BaseMapper } from '../base.mapper';
import { EmployeeSession as EmployeeSessionInfrastructureEntity } from './employee-session-typeorm.entity';

export class EmployeeSessionMapper
  implements
    BaseMapper<
      EmployeeSessionDomainEntity,
      EmployeeSessionInfrastructureEntity
    >
{
  mapToORM(
    employeeDomainEntity: EmployeeSessionDomainEntity,
  ): EmployeeSessionInfrastructureEntity {
    const orm = new EmployeeSessionInfrastructureEntity();
    orm.id = employeeDomainEntity.id;
    orm.employeeId = employeeDomainEntity.employeeId;
    orm.hash = employeeDomainEntity.hash;
    orm.isLogout = employeeDomainEntity.isLogout;
    orm.createdAt = employeeDomainEntity.createdAt!;
    return orm;
  }

  mapToDomain(
    employeeInfraEntity: EmployeeSessionInfrastructureEntity,
  ): EmployeeSessionDomainEntity {
    return plainToInstance(EmployeeSessionDomainEntity, {
      id: employeeInfraEntity.id,
      employeeId: employeeInfraEntity.employeeId,
      hash: employeeInfraEntity.hash,
      isLogout: employeeInfraEntity.isLogout,
      createdAt: employeeInfraEntity.createdAt,
    });
  }
}
