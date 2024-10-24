import { BaseEntity } from '@core-common/base.entity';

export class User extends BaseEntity {
  id: number;
  username: string;
  password: string;

  constructor(data: Partial<User>) {
    super();
    Object.assign(this, data);
  }
}
