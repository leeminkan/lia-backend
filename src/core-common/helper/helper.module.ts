import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AllConfigType } from '@core-common/configs';

import { HelperArrayService } from './services/helper-array.service';
import { HelperDateService } from './services/helper-date.service';
import { HelperEncryptionService } from './services/helper-encryption.service';
import { HelperHashService } from './services/helper-hash.service';
import { HelperNumberService } from './services/helper-number.service';
import { HelperStringService } from './services/helper-string.service';

@Global()
@Module({})
export class HelperModule {
  static forRoot(): DynamicModule {
    return {
      module: HelperModule,
      providers: [
        HelperArrayService,
        HelperDateService,
        HelperEncryptionService,
        HelperHashService,
        HelperNumberService,
        HelperStringService,
      ],
      exports: [
        HelperArrayService,
        HelperDateService,
        HelperEncryptionService,
        HelperHashService,
        HelperNumberService,
        HelperStringService,
      ],
      controllers: [],
      imports: [
        JwtModule.registerAsync({
          inject: [ConfigService],
          imports: [ConfigModule],
          useFactory: (configService: ConfigService<AllConfigType>) => ({
            secret: configService.get('helper.jwt.secretKey', {
              infer: true,
            }),
            signOptions: {
              expiresIn: configService.get('helper.jwt.expirationTime', {
                infer: true,
              }),
            },
          }),
        }),
      ],
    };
  }
}
