import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from '@core-common/configs';
import { HelperHashService } from '@core-common/helpers/services';
import { EmployeeRepository } from '@core-infrastructure/database/persistence/employee/employee.repository';

import { Employee } from '../employee.entity';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly helperHashService: HelperHashService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async execute(params: CreateEmployeeUseCaseParams) {
    const employee = new Employee({
      ...params,
    });
    employee.password = this.createHashedPassword(employee.password);
    return await this.employeeRepository.create(employee);
  }

  createHashedPassword(password: string) {
    const salt = this.helperHashService.randomSalt(
      this.configService.getOrThrow('helper.saltLength', { infer: true }),
    );
    const hashedPassword = this.helperHashService.bcrypt(password, salt);
    return hashedPassword;
  }
}

// TYPES
export type CreateEmployeeUseCaseParams = Omit<Employee, 'id'>;
