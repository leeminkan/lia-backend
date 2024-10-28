import { Module } from '@nestjs/common';

import { DatabaseModule } from '@core-infrastructure/database/database.module';
import { EmployeeSession } from '@core-infrastructure/database/persistence/employee-session/employee-session-typeorm.entity';
import { Employee } from '@core-infrastructure/database/persistence/employee/employee-typeorm.entity';
import { EmployeeAuthServiceModule } from '@core-modules/employee-auth/employey-auth.service-module';
import { RefreshTokenUseCase } from '@core-modules/employee-auth/usecases/refresh-token.usecase';
import { SignInUseCase } from '@core-modules/employee-auth/usecases/sign-in.usecase';

import { EmployeeAuthController } from './employee-auth.controller';

@Module({
  imports: [
    DatabaseModule.forFeature([Employee, EmployeeSession]),
    EmployeeAuthServiceModule,
  ],
  controllers: [EmployeeAuthController],
  providers: [SignInUseCase, RefreshTokenUseCase],
})
export class EmployeeAuthModule {}
