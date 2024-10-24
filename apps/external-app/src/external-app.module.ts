import { Module } from '@nestjs/common';

import { ExternalAppController } from './external-app.controller';
import { ExternalAppService } from './external-app.service';

@Module({
  imports: [],
  controllers: [ExternalAppController],
  providers: [ExternalAppService],
})
export class ExternalAppModule {}
