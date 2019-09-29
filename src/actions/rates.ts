import { 
  ActionTypes as AT,
} from '../types/enums';
import * as A from '../types/actions/rates'
import { ApiResponse } from '../types/api';

export const updateRates = (resp: ApiResponse): A.UpdateRates => {
  return {
    type: AT.UpdateRates,
    payload: resp
  };
};