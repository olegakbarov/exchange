import { 
  ActionTypes as AT,
} from '../enums';
import { ApiResponse } from '../api';

export type UpdateRates = {
  type: AT.UpdateRates,
  payload: ApiResponse
};