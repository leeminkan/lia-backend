import { Test, TestingModule } from '@nestjs/testing';
import { ExternalAppController } from './external-app.controller';
import { ExternalAppService } from './external-app.service';

describe('ExternalAppController', () => {
  let externalAppController: ExternalAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExternalAppController],
      providers: [ExternalAppService],
    }).compile();

    externalAppController = app.get<ExternalAppController>(ExternalAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(externalAppController.getHello()).toBe('Hello World!');
    });
  });
});
