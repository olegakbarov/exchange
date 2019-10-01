import { Action } from "redux";
import { Reducer } from "../types/redux";
// import { AsyncActionStatus } from '../types/asyncActions';

type RootReducer<S, A extends Action = Action> = {
  [type: string]: Reducer<S, A>;
};

// type AsyncAction = Action & {
//   status: AsyncActionStatus;
// };

// function isAsyncAction(action: Action): action is AsyncAction {
//   return action.hasOwnProperty('status');
// }

export default function createReducer<S extends {}, A extends Action = Action>(
  reducerName: string,
  reducers: RootReducer<S, A>,
  state: S,
  action: A
): S {
  Object.keys(reducers).forEach(
    a => !a && console.error("Undefined reducer found!")
  );

  let restoredState = state;

  const reducerOrMap = reducers[action.type];
  let reducer: Reducer<S, A> | undefined;

  if (reducerOrMap && typeof reducerOrMap !== "function") {
    // if (isAsyncAction(action)) {
    //   reducer = reducerOrMap[action.status];
    // }
  } else {
    reducer = reducerOrMap;
  }

  const newState = reducer
    ? reducer(restoredState as S, action)
    : (restoredState as S);

  return newState;
}
