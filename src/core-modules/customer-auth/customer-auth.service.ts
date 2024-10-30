import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

import { AllConfigType } from '@core-common/configs';
import { HelperEncryptionService } from '@core-common/helpers/services';

@Injectable()
export class CustomerAuthService {
  constructor(
    private readonly helperEncryptionService: HelperEncryptionService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async signToken(data: {
    customerId: number;
    sessionId: string;
    hash: string;
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.helperEncryptionService.jwtEncrypt(
        {
          customerId: data.customerId,
          sessionId: data.sessionId,
        },
        {
          secretKey: this.configService.getOrThrow('auth.secret', {
            infer: true,
          }),
          expiredIn: tokenExpiresIn,
        },
      ),
      await this.helperEncryptionService.jwtEncrypt(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secretKey: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiredIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
