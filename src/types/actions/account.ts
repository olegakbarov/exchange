import {
  ActionTypes as AT,
  CurrencyCode
} from '../enums';

export type UpdateAccount = {
  type: AT.UpdateAccount,
  payload: {
    currency: CurrencyCode
    value: number
  }
};

export type AccountAction = UpdateAccount