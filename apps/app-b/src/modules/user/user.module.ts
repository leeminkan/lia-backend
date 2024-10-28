import { Module } from '@nestjs/common';

import { DatabaseModule } from '@core-infrastructure/database/database.module';
import { User } from '@core-infrastructure/database/persistence/user/user-typeorm.entity';
import { CreateUserUseCase } from '@core-modules/user/usecases/create-user.usecase';
import { GetDetailUserUseCase } from '@core-modules/user/usecases/get-detail-user.usecase';
import { GetListUserUseCase } from '@core-modules/user/usecases/get-list-user.usecase';

import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule.forFeature([User])],
  controllers: [UserController],
  providers: [GetListUserUseCase, CreateUserUseCase, GetDetailUserUseCase],
})
export class UserModule {}
