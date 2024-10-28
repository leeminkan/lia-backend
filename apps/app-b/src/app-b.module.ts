import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AllConfigType, configs } from '@core-common/configs';
import { HelperModule } from '@core-common/helpers/helper.module';
import { RequestModule } from '@core-common/requests/request.module';
import { DatabaseModule } from '@core-infrastructure/database/database.module';
import { EmployeeAuthStrategyModule } from '@core-modules/employee-auth/strategies/employee-auth-strategy.module';

import { EmployeeAuthModule } from './modules/employee-auth/employee-auth.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    // SETUP
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AllConfigType>) => {
        const config = configService.getOrThrow('database', {
          infer: true,
        });

        return {
          typeOrmOptions: config,
        };
      },
    }),
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    HelperModule.forRoot(),
    RequestModule.forRoot(),
    // FEATURES
    EmployeeAuthStrategyModule,
    EmployeeModule,
    EmployeeAuthModule,
  ],
})
export class AppBModule {}
