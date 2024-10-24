import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AllConfigType, configs } from '@core-common/configs';
import { HelperModule } from '@core-common/helper/helper.module';
import { RequestModule } from '@core-common/request/request.module';
import { DatabaseModule } from '@core-infrastructure/database/database.module';

import { UserModule } from './modules/user/user.module';

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
    UserModule,
  ],
})
export class AppModule {}
