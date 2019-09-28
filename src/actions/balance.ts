import { 
  ActionTypes as AT,
  AsyncActionTypes as AAT, 
  Currency
} from '../types/enums';
import * as A from '../types/actions/account'

export const updateAccount = (currency: Currency, value: number): A.UpdateAccount => {
  return {
    type: AT.UpdateAccount,
    payload: {
      currency,
      value
    }
  };
};