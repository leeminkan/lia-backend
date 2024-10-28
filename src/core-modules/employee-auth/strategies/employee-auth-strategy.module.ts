import { Module } from '@nestjs/common';

import { JwtRefreshStrategy } from '@core-modules/employee-auth/strategies/jwt-refresh.strategy';
import { JwtStrategy } from '@core-modules/employee-auth/strategies/jwt.strategy';

@Module({
  providers: [JwtStrategy, JwtRefreshStrategy],
})
export class EmployeeAuthStrategyModule {}
