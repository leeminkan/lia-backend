import { Injectable } from '@nestjs/common';

import { UserRepository } from '@core-infrastructure/database/persistence/user/user.repository';

@Injectable()
export class GetDetailUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number) {
    return await this.userRepository.findById(id);
  }
}
