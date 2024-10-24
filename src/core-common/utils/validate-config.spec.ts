import { IsNumber, IsString } from 'class-validator';
import 'reflect-metadata';

import { validateConfig } from './validate-config';

describe('validateConfig', () => {
  class TestConfig {
    @IsNumber()
    numberProperty: number;

    @IsString()
    stringProperty: string;
  }

  it('should validate valid config', () => {
    // Arrange
    const config = {
      numberProperty: 123,
      stringProperty: 'test',
    };

    // Act
    const validatedConfig = validateConfig<TestConfig>(config, TestConfig);

    // Assert
    expect(validatedConfig).toEqual({
      numberProperty: 123,
      stringProperty: 'test',
    });
  });

  it('should throw error for invalid config', () => {
    // Arrange
    const config = {
      numberProperty: 'invalid',
      stringProperty: 123,
    };

    // Act
    // Assert
    expect(() => validateConfig<TestConfig>(config, TestConfig)).toThrow();
  });
});
