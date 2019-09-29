import { 
  ActionTypes as AT,
  CurrencyCode
} from '../types/enums';
import * as A from '../types/actions/account'

export const updateAccount = (currency: CurrencyCode, value: number): A.UpdateAccount => {
  return {
    type: AT.UpdateAccount,
    payload: {
      currency,
      value
    }
  };
};