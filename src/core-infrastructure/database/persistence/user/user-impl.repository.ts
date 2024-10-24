import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsOrder, Repository } from 'typeorm';

import { BasePaginationResult } from '@core-common/base-pagination-result.interface';
import { User as UserDomainEntity } from '@core-modules/user/user.entity';

import { BaseRepository } from '../base.repository';
import { User as UserInfrastructureEntity } from './user-typeorm.entity';
import { UserMapper } from './user.mapper';
import { FindAndCountAllUserParams, UserRepository } from './user.repository';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepository<UserDomainEntity, UserInfrastructureEntity>
  implements UserRepository
{
  constructor(
    @InjectRepository(UserInfrastructureEntity)
    private readonly userRepo: Repository<UserInfrastructureEntity>,
  ) {
    super(new UserMapper(), userRepo);
  }

  async findAndCountAll({
    page = 1,
    perPage = 10,
    orderBy,
    orderDirection,
  }: FindAndCountAllUserParams): Promise<
    BasePaginationResult<UserDomainEntity>
  > {
    const findOptions = {} as FindManyOptions<UserInfrastructureEntity>;

    if (page && perPage) {
      findOptions.skip = (page - 1) * perPage;
      findOptions.take = perPage;
    }

    if (orderBy && orderDirection) {
      findOptions.order = {
        [orderBy]: orderDirection,
      } as FindOptionsOrder<UserInfrastructureEntity>;
    }

    const [result, countEntities] = await Promise.all([
      this.repository.find(findOptions),
      this.repository.count(findOptions),
    ]);

    return {
      data: result.map((entity) => this.mapper.mapToDomain(entity)),
      metadata: {
        page,
        perPage,
        totalPages: Math.ceil(countEntities / perPage),
        totalItems: countEntities,
      },
    };
  }
}
