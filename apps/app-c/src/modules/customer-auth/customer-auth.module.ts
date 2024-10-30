import { Module } from '@nestjs/common';

import { DatabaseModule } from '@core-infrastructure/database/database.module';
import { CustomerSession } from '@core-infrastructure/database/persistence/customer-session/customer-session-typeorm.entity';
import { Customer } from '@core-infrastructure/database/persistence/customer/customer-typeorm.entity';
import { CustomerAuthServiceModule } from '@core-modules/customer-auth/customer-auth.service-module';
import { RefreshTokenUseCase } from '@core-modules/customer-auth/usecases/refresh-token.usecase';
import { SignInUseCase } from '@core-modules/customer-auth/usecases/sign-in.usecase';

import { CustomerAuthController } from './customer-auth.controller';

@Module({
  imports: [
    DatabaseModule.forFeature([Customer, CustomerSession]),
    CustomerAuthServiceModule,
  ],
  controllers: [CustomerAuthController],
  providers: [SignInUseCase, RefreshTokenUseCase],
})
export class CustomerAuthModule {}
