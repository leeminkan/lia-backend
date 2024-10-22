import { Injectable } from '@nestjs/common';

@Injectable()
export class ExternalAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
