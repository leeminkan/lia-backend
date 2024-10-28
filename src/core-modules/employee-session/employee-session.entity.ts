import { BaseEntity } from '@core-common/base.entity';

export class EmployeeSession extends BaseEntity {
  id: string;
  employeeId: number;
  hash: string;
  isLogout: boolean;

  constructor(data: Partial<EmployeeSession>) {
    super();
    Object.assign(this, data);
  }
}
