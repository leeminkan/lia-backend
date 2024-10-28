import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { HelperFormatResponseService } from '@core-common/helpers/services/helper-format-response.service';
import { CreateEmployeeUseCase } from '@core-modules/employee/usecases/create-employee.usecase';
import { GetDetailEmployeeUseCase } from '@core-modules/employee/usecases/get-detail-employee.usecase';
import { GetListEmployeeUseCase } from '@core-modules/employee/usecases/get-list-employee.usecase';

import { CreateEmployeeRequestDto } from './dtos/requests/create-employee-request.dto';
import { GetListEmployeeRequestDto } from './dtos/requests/get-list-employee-request.dto';
import { EmployeeResponse } from './dtos/responses/employee-response.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('/employees')
export class EmployeeController {
  constructor(
    private readonly getListEmployeeUseCase: GetListEmployeeUseCase,
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly getDetailEmployeeUseCase: GetDetailEmployeeUseCase,
    private readonly helperFormatResponseService: HelperFormatResponseService,
  ) {}

  @Post('/')
  async create(
    @Body()
    body: CreateEmployeeRequestDto,
  ) {
    const employee = await this.createEmployeeUseCase.execute(body);

    return this.helperFormatResponseService.detail({
      data: new EmployeeResponse({ ...employee }),
      message: 'Create successfully!',
    });
  }

  @Get('/')
  async getList(
    @Query() { page = 1, perPage = 20, ...rest }: GetListEmployeeRequestDto,
  ) {
    const listEmployee = await this.getListEmployeeUseCase.execute({
      page,
      perPage,
      ...rest,
    });
    listEmployee.data = listEmployee.data.map(
      (employee) => new EmployeeResponse({ ...employee }),
    );

    return this.helperFormatResponseService.list({
      data: listEmployee.data,
      metadata: listEmployee.metadata,
    });
  }

  @Get(':id')
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    const employee = await this.getDetailEmployeeUseCase.execute(id);

    return this.helperFormatResponseService.detail({
      data: new EmployeeResponse({ ...employee }),
    });
  }
}
