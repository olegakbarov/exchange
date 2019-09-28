import { Action, AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './states';

export type DA<T = void, A extends Action = AnyAction> = (
  dispatch: Dispatch<A>,
  getState: () => RootState
) => Promise<T>;

export type TDA<A extends Action = AnyAction> = ThunkDispatch<
  RootState,
  void,
  A
>;

export type Reducer<S, T extends Action> = (state: S, action: T) => S;

export type ReactDispatch<T> = T extends (...args: any[]) => Action
  ? T
  : T extends (
      ...args: infer A
    ) => (dispatch: any, getState: () => RootState) => infer X
  ? (...args: A) => X
  : never;
