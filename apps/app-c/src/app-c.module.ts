import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AllConfigType, configs } from '@core-common/configs';
import { HelperModule } from '@core-common/helpers/helper.module';
import { RequestModule } from '@core-common/requests/request.module';
import { DatabaseModule } from '@core-infrastructure/database/database.module';
import { CustomerAuthStrategyModule } from '@core-modules/customer-auth/strategies/customer-auth-strategy.module';

import { CustomerAuthModule } from './modules/customer-auth/customer-auth.module';
import { CustomerModule } from './modules/customer/customer.module';

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
    CustomerAuthStrategyModule,
    CustomerModule,
    CustomerAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppCModule {}
