import { BaseEntity } from '@core-common/base.entity';

export class Customer extends BaseEntity {
  id: number;
  username: string;
  password: string;

  constructor(data: Partial<Customer>) {
    super();
    Object.assign(this, data);
  }
}
