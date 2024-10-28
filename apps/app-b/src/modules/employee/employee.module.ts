import { Module } from '@nestjs/common';

import { DatabaseModule } from '@core-infrastructure/database/database.module';
import { Employee } from '@core-infrastructure/database/persistence/employee/employee-typeorm.entity';
import { CreateEmployeeUseCase } from '@core-modules/employee/usecases/create-employee.usecase';
import { GetDetailEmployeeUseCase } from '@core-modules/employee/usecases/get-detail-employee.usecase';
import { GetListEmployeeUseCase } from '@core-modules/employee/usecases/get-list-employee.usecase';

import { EmployeeController } from './employee.controller';

@Module({
  imports: [DatabaseModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [
    GetListEmployeeUseCase,
    CreateEmployeeUseCase,
    GetDetailEmployeeUseCase,
  ],
})
export class EmployeeModule {}
