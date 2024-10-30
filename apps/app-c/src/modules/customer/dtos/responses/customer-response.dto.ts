import { Exclude } from 'class-transformer';

import { Customer } from '@core-modules/customer/customer.entity';

export class CustomerResponse extends Customer {
  @Exclude()
  password: string;
}
