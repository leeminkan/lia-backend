import { Module } from '@nestjs/common';

import { DatabaseModule } from '@core-infrastructure/database/database.module';
import { Customer } from '@core-infrastructure/database/persistence/customer/customer-typeorm.entity';
import { CreateCustomerUseCase } from '@core-modules/customer/usecases/create-customer.usecase';
import { GetDetailCustomerUseCase } from '@core-modules/customer/usecases/get-detail-customer.usecase';
import { GetListCustomerUseCase } from '@core-modules/customer/usecases/get-list-customer.usecase';

import { CustomerController } from './customer.controller';

@Module({
  imports: [DatabaseModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    GetListCustomerUseCase,
    CreateCustomerUseCase,
    GetDetailCustomerUseCase,
  ],
})
export class CustomerModule {}
