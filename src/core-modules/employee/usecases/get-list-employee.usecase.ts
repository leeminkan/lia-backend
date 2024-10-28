import { Injectable } from '@nestjs/common';

import {
  EmployeeRepository,
  FindAndCountAllEmployeeParams,
} from '@core-infrastructure/database/persistence/employee/employee.repository';

@Injectable()
export class GetListEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(params: GetListEmployeeUseCaseParams) {
    return await this.employeeRepository.findAndCountAll(params);
  }
}

// TYPES
export type GetListEmployeeUseCaseParams = FindAndCountAllEmployeeParams;
