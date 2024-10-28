import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { HelperHashService } from '@core-common/helpers/services';
import { EmployeeSessionRepository } from '@core-infrastructure/database/persistence/employee-session/employee-session.repository';
import { EmployeeRepository } from '@core-infrastructure/database/persistence/employee/employee.repository';

import { EmployeeAuthService } from '../employee-auth.service';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly employeeSessionRepository: EmployeeSessionRepository,
    private readonly helperHashService: HelperHashService,
    private readonly employeeAuthService: EmployeeAuthService,
  ) {}

  async execute({ username, password }: SignInUseCaseParams) {
    const user = await this.employeeRepository.findByUsername(username);
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

    const session = await this.employeeSessionRepository.create({
      employeeId: user.id,
      hash,
      isLogout: false,
    });

    return await this.employeeAuthService.signToken({
      employeeId: user.id,
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
