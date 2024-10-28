import { HttpStatus, Injectable } from '@nestjs/common';

import { IHelperFormatResponseService } from '../interfaces/helper-format-response-service.interface';
import { IHelperResponse } from '../interfaces/helper.interface';

@Injectable()
export class HelperFormatResponseService
  implements IHelperFormatResponseService
{
  detail<T>({
    statusCode = HttpStatus.OK,
    message = 'Get detail successfully!',
    ...params
  }: Partial<IHelperResponse<T>> &
    Pick<IHelperResponse<T>, 'data'>): IHelperResponse<T> {
    return {
      statusCode,
      message,
      ...params,
    };
  }

  list<T>({
    statusCode = HttpStatus.OK,
    message = 'Get list successfully!',
    ...params
  }: Partial<IHelperResponse<T[]>> &
    Pick<IHelperResponse<T[]>, 'data' | 'metadata'>): IHelperResponse<T[]> {
    return {
      statusCode,
      message,
      ...params,
    };
  }
}
