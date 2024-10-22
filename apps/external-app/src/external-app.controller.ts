import { Controller, Get } from '@nestjs/common';
import { ExternalAppService } from './external-app.service';

@Controller()
export class ExternalAppController {
  constructor(private readonly externalAppService: ExternalAppService) {}

  @Get()
  getHello(): string {
    return this.externalAppService.getHello();
  }
}
