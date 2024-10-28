import { Module } from '@nestjs/common';

import { EmployeeAuthService } from './employee-auth.service';

@Module({
  imports: [],
  providers: [EmployeeAuthService],
  exports: [EmployeeAuthService],
})
export class EmployeeAuthServiceModule {}
