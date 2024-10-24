import { plainToInstance } from 'class-transformer';

import { User as UserDomainEntity } from '@core-modules/user/user.entity';

import { BaseMapper } from '../base.mapper';
import { User as UserInfrastructureEntity } from './user-typeorm.entity';

export class UserMapper
  implements BaseMapper<UserDomainEntity, UserInfrastructureEntity>
{
  mapToORM(userDomainEntity: UserDomainEntity): UserInfrastructureEntity {
    const orm = new UserInfrastructureEntity();
    orm.id = userDomainEntity.id;
    orm.username = userDomainEntity.username;
    orm.password = userDomainEntity.password;
    orm.createdAt = userDomainEntity.createdAt!;
    return orm;
  }

  mapToDomain(userInfraEntity: UserInfrastructureEntity): UserDomainEntity {
    return plainToInstance(UserDomainEntity, {
      id: userInfraEntity.id,
      username: userInfraEntity.username,
      password: userInfraEntity.password,
      createdAt: userInfraEntity.createdAt,
    });
  }
}
