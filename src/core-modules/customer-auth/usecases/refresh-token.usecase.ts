import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { HelperHashService } from '@core-common/helpers/services';
import { CustomerSessionRepository } from '@core-infrastructure/database/persistence/customer-session/customer-session.repository';
import { CustomerRepository } from '@core-infrastructure/database/persistence/customer/customer.repository';

import { CustomerAuthService } from '../customer-auth.service';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerSessionRepository: CustomerSessionRepository,
    private readonly helperHashService: HelperHashService,
    private readonly customerAuthService: CustomerAuthService,
  ) {}

  async execute(data: RefreshTokenUseCaseParams) {
    const session = await this.customerSessionRepository.findById(
      data.sessionId,
    );

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException();
    }

    if (session.isLogout) {
      throw new UnauthorizedException();
    }

    const user = await this.customerRepository.findById(session.customerId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.helperHashService.sha256(randomStringGenerator());

    await this.customerSessionRepository.update({
      ...session,
      hash,
    });
    return await this.customerAuthService.signToken({
      customerId: user.id,
      sessionId: session.id,
      hash,
    });
  }
}

// TYPES
export type RefreshTokenUseCaseParams = {
  sessionId: string;
  hash: string;
};
