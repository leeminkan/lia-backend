import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import {
  SortDirection,
  sortDirection,
} from '@core-common/constants/sort.constant';

export class GetListCustomerRequestDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  perPage?: number;

  @IsOptional()
  @IsIn(['createdAt'])
  orderBy?: 'createdAt';

  @IsOptional()
  @IsEnum(sortDirection)
  orderDirection?: SortDirection;

  @IsOptional()
  @IsString()
  search?: string;
}
