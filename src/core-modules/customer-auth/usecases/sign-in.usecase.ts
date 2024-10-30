import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { HelperHashService } from '@core-common/helpers/services';
import { CustomerSessionRepository } from '@core-infrastructure/database/persistence/customer-session/customer-session.repository';
import { CustomerRepository } from '@core-infrastructure/database/persistence/customer/customer.repository';

import { CustomerAuthService } from '../customer-auth.service';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerSessionRepository: CustomerSessionRepository,
    private readonly helperHashService: HelperHashService,
    private readonly customerAuthService: CustomerAuthService,
  ) {}

  async execute({ username, password }: SignInUseCaseParams) {
    const user = await this.customerRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = this.helperHashService.bcryptCompare(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const hash = this.helperHashService.sha256(randomStringGenerator());

    const session = await this.customerSessionRepository.create({
      customerId: user.id,
      hash,
      isLogout: false,
    });

    return await this.customerAuthService.signToken({
      customerId: user.id,
      sessionId: session.id,
      hash,
    });
  }
}

// TYPES
export type SignInUseCaseParams = {
  username: string;
  password: string;
};
