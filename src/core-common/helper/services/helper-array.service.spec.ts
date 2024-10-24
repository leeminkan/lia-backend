import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { HelperArrayService } from './helper-array.service';

describe('HelperArrayService', () => {
  let service: HelperArrayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperArrayService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<HelperArrayService>(HelperArrayService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFromLeft', () => {
    describe('when given an non-empty array', () => {
      it('should get elements from the left', () => {
        // Arrange
        const array = [1, 2, 3, 4, 5];

        // Act
        const result = service.getFromLeft(array, 3);

        // Assert
        expect(result).toEqual([1, 2, 3]);
      });
    });

    describe('when given an empty array', () => {
      it('should return empty array', () => {
        // Arrange
        const array = [] as number[];

        // Act
        const result = service.getFromLeft(array, 3);

        // Assert
        expect(result).toEqual([]);
      });
    });
  });
});
