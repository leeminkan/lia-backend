import { Injectable } from '@nestjs/common';

import {
  CustomerRepository,
  FindAndCountAllCustomerParams,
} from '@core-infrastructure/database/persistence/customer/customer.repository';

@Injectable()
export class GetListCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(params: GetListCustomerUseCaseParams) {
    return await this.customerRepository.findAndCountAll(params);
  }
}

// TYPES
export type GetListCustomerUseCaseParams = FindAndCountAllCustomerParams;
