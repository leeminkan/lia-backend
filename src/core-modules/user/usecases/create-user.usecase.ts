import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from '@core-common/configs';
import { HelperHashService } from '@core-common/helper/services';
import { UserRepository } from '@core-infrastructure/database/persistence/user/user.repository';

import { User } from '../user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly helperHashService: HelperHashService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async execute(params: CreateUserUseCaseParams) {
    const user = new User({
      ...params,
    });
    user.password = this.createHashedPassword(user.password);
    return await this.userRepository.create(user);
  }

  createHashedPassword(password: string) {
    const salt = this.helperHashService.randomSalt(
      this.configService.getOrThrow('helper.saltLength', { infer: true }),
    );
    const hashedPassword = this.helperHashService.bcrypt(password, salt);
    return hashedPassword;
  }
}

// TYPES
export type CreateUserUseCaseParams = Omit<User, 'id'>;
