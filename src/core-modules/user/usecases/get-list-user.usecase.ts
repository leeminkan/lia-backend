import { Injectable } from '@nestjs/common';

import {
  FindAndCountAllUserParams,
  UserRepository,
} from '@core-infrastructure/database/persistence/user/user.repository';

@Injectable()
export class GetListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(params: GetListUserUseCaseParams) {
    return await this.userRepository.findAndCountAll(params);
  }
}

// TYPES
export type GetListUserUseCaseParams = FindAndCountAllUserParams;
