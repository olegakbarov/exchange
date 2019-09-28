import {
  ActionTypes as AT,
  Currency
} from '../enums';

export type UpdateAccount = {
  type: AT.UpdateAccount,
  payload: {
    currency: Currency
    value: number
  }
};

export type AccountAction = UpdateAccount