import { Exclude } from 'class-transformer';

import { Employee } from '@core-modules/employee/employee.entity';

export class EmployeeResponse extends Employee {
  @Exclude()
  password: string;
}
