import * as A from '../types/actions';
import {
  ActionTypes as AT,
} from '../types/enums';
import { AccountState } from '../types/states';
import createReducer from '../utils/createReducer';
// import { Reducer } from '../types/redux';
// import { ToRequest, ToError } from '../types/asyncActions';

const DEFAULT_STATE: AccountState = {
  USD: 100,
  GBP: 200,
  EUR: 300
};

// type R<X extends A.AccountAction> = Reducer<
//   AccountState,
//   X
// >;
// type RRequest<X> = Reducer<AccountState, ToRequest<X>>;
// type RError<X> = Reducer<AccountState, ToError<X>>;

const update = (state: AccountState, { payload: { currency, value }}: A.AccountAction) => ({
  ...state,
  [currency]: value
})

export default function account(
  state: AccountState = DEFAULT_STATE,
  action: A.AccountAction
): AccountState {
  return createReducer(
    'account',
    {
      [AT.UpdateAccount]: update,
    }, 
    state,
    action
  );
}