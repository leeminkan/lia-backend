import { plainToInstance } from 'class-transformer';

import { Employee as EmployeeDomainEntity } from '@core-modules/employee/employee.entity';

import { BaseMapper } from '../base.mapper';
import { Employee as EmployeeInfrastructureEntity } from './employee-typeorm.entity';

export class EmployeeMapper
  implements BaseMapper<EmployeeDomainEntity, EmployeeInfrastructureEntity>
{
  mapToORM(
    employeeDomainEntity: EmployeeDomainEntity,
  ): EmployeeInfrastructureEntity {
    const orm = new EmployeeInfrastructureEntity();
    orm.id = employeeDomainEntity.id;
    orm.username = employeeDomainEntity.username;
    orm.password = employeeDomainEntity.password;
    orm.createdAt = employeeDomainEntity.createdAt!;
    return orm;
  }

  mapToDomain(
    employeeInfraEntity: EmployeeInfrastructureEntity,
  ): EmployeeDomainEntity {
    return plainToInstance(EmployeeDomainEntity, {
      id: employeeInfraEntity.id,
      username: employeeInfraEntity.username,
      password: employeeInfraEntity.password,
      createdAt: employeeInfraEntity.createdAt,
    });
  }
}
