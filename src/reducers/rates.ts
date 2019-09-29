import * as A from '../types/actions';
import {
  ActionTypes as AT
} from '../types/enums';
import { RatesState } from '../types/states';
import createReducer from '../utils/createReducer';
import { Reducer } from '../types/redux';

const DEFAULT_STATE: RatesState = {};

const update: Reducer<RatesState, A.UpdateRates> = (state: RatesState, { payload: { base, rates }}: A.UpdateRates) => ({
  ...state,
  [base]: rates
})

export default function rates(
  state: RatesState = DEFAULT_STATE,
  action: A.UpdateRates
): RatesState {
  return createReducer(
    'rates',
    {
      [AT.UpdateRates]: update,
    }, 
    state,
    action
  );
}