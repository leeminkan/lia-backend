import { Module } from '@nestjs/common';

import { CustomerAuthService } from './customer-auth.service';

@Module({
  imports: [],
  providers: [CustomerAuthService],
  exports: [CustomerAuthService],
})
export class CustomerAuthServiceModule {}
