import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '@core-infrastructure/database/persistence/customer/customer.repository';

@Injectable()
export class GetDetailCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id: number) {
    return await this.customerRepository.findById(id);
  }
}
