import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserUseCase } from '@core-modules/user/usecases/create-user.usecase';
import { GetDetailUserUseCase } from '@core-modules/user/usecases/get-detail-user.usecase';
import { GetListUserUseCase } from '@core-modules/user/usecases/get-list-user.usecase';

import { CreateUserRequestDto } from './dtos/requests/create-user-request.dto';
import { UserResponse } from './dtos/responses/user-response.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/users')
export class UserController {
  constructor(
    private readonly getListUserUseCase: GetListUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getDetailUserUseCase: GetDetailUserUseCase,
  ) {}

  @Post('/')
  async create(
    @Body()
    body: CreateUserRequestDto,
  ) {
    const user = await this.createUserUseCase.execute(body);

    return new UserResponse({ ...user });
  }

  @Get('/')
  async getList() {
    const listUser = await this.getListUserUseCase.execute({});
    listUser.data = listUser.data.map((user) => new UserResponse({ ...user }));

    return listUser;
  }

  @Get(':id')
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getDetailUserUseCase.execute(id);
    return new UserResponse({ ...user });
  }
}
