import { BaseEntity } from '@core-common/base.entity';

export class CustomerSession extends BaseEntity {
  id: string;
  customerId: number;
  hash: string;
  isLogout: boolean;

  constructor(data: Partial<CustomerSession>) {
    super();
    Object.assign(this, data);
  }
}
