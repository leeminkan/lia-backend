import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { HelperFormatResponseService } from '@core-common/helpers/services/helper-format-response.service';
import { CreateCustomerUseCase } from '@core-modules/customer/usecases/create-customer.usecase';
import { GetDetailCustomerUseCase } from '@core-modules/customer/usecases/get-detail-customer.usecase';
import { GetListCustomerUseCase } from '@core-modules/customer/usecases/get-list-customer.usecase';

import { CreateCustomerRequestDto } from './dtos/requests/create-customer-request.dto';
import { GetListCustomerRequestDto } from './dtos/requests/get-list-customer-request.dto';
import { CustomerResponse } from './dtos/responses/customer-response.dto';

// @UseGuards(AuthGuard('jwt'))
// @UseInterceptors(ClassSerializerInterceptor)
@Controller('/customers')
export class CustomerController {
  constructor(
    private readonly getListCustomerUseCase: GetListCustomerUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getDetailCustomerUseCase: GetDetailCustomerUseCase,
    private readonly helperFormatResponseService: HelperFormatResponseService,
  ) {}

  @Post('/')
  async create(
    @Body()
    body: CreateCustomerRequestDto,
  ) {
    const customer = await this.createCustomerUseCase.execute(body);

    return this.helperFormatResponseService.detail({
      data: new CustomerResponse({ ...customer }),
      message: 'Create successfully!',
    });
  }

  @Get('/')
  async getList(
    @Query() { page = 1, perPage = 20, ...rest }: GetListCustomerRequestDto,
  ) {
    const listCustomer = await this.getListCustomerUseCase.execute({
      page,
      perPage,
      ...rest,
    });
    listCustomer.data = listCustomer.data.map(
      (customer) => new CustomerResponse({ ...customer }),
    );

    return this.helperFormatResponseService.list({
      data: listCustomer.data,
      metadata: listCustomer.metadata,
    });
  }

  @Get(':id')
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.getDetailCustomerUseCase.execute(id);

    return this.helperFormatResponseService.detail({
      data: new CustomerResponse({ ...customer }),
    });
  }
}
