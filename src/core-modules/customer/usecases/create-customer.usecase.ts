import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from '@core-common/configs';
import { HelperHashService } from '@core-common/helpers/services';
import { CustomerRepository } from '@core-infrastructure/database/persistence/customer/customer.repository';

import { Customer } from '../customer.entity';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly helperHashService: HelperHashService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async execute(params: CreateCustomerUseCaseParams) {
    const customer = new Customer({
      ...params,
    });
    customer.password = this.createHashedPassword(customer.password);
    return await this.customerRepository.create(customer);
  }

  createHashedPassword(password: string) {
    const salt = this.helperHashService.randomSalt(
      this.configService.getOrThrow('helper.saltLength', { infer: true }),
    );
    const hashedPassword = this.helperHashService.bcrypt(password, salt);
    return hashedPassword;
  }
}

// TYPES
export type CreateCustomerUseCaseParams = Omit<Customer, 'id'>;
