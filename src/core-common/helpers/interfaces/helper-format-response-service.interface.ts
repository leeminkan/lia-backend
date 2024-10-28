import { IHelperResponse } from './helper.interface';

export interface IHelperFormatResponseService {
  detail<T>(
    params: Partial<IHelperResponse<T>> & Pick<IHelperResponse<T>, 'data'>,
  ): IHelperResponse<T>;
  list<T>(
    params: Partial<IHelperResponse<T>> &
      Pick<IHelperResponse<T[]>, 'data' | 'metadata'>,
  ): IHelperResponse<T[]>;
}
