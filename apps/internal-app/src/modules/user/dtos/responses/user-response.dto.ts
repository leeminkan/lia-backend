import { Exclude } from 'class-transformer';

import { User } from '@core-modules/user/user.entity';

export class UserResponse extends User {
  @Exclude()
  password: string;
}
