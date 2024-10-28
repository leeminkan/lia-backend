import { BaseEntity } from '@core-common/base.entity';

export class Employee extends BaseEntity {
  id: number;
  username: string;
  password: string;

  constructor(data: Partial<Employee>) {
    super();
    Object.assign(this, data);
  }
}
