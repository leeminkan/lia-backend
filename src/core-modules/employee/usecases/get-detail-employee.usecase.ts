import { Injectable } from '@nestjs/common';

import { EmployeeRepository } from '@core-infrastructure/database/persistence/employee/employee.repository';

@Injectable()
export class GetDetailEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: number) {
    return await this.employeeRepository.findById(id);
  }
}
