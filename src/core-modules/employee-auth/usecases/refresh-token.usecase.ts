import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { HelperHashService } from '@core-common/helpers/services';
import { EmployeeSessionRepository } from '@core-infrastructure/database/persistence/employee-session/employee-session.repository';
import { EmployeeRepository } from '@core-infrastructure/database/persistence/employee/employee.repository';

import { EmployeeAuthService } from '../employee-auth.service';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly employeeSessionRepository: EmployeeSessionRepository,
    private readonly helperHashService: HelperHashService,
    private readonly employeeAuthService: EmployeeAuthService,
  ) {}

  async execute(data: RefreshTokenUseCaseParams) {
    const session = await this.employeeSessionRepository.findById(
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

    const user = await this.employeeRepository.findById(session.employeeId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.helperHashService.sha256(randomStringGenerator());

    await this.employeeSessionRepository.update({
      ...session,
      hash,
    });
    return await this.employeeAuthService.signToken({
      employeeId: user.id,
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
