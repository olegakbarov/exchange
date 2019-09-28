import { AsyncActionTypes as AT } from './enums';

type ActionTemplate<T, P extends object> = {
  type: T;
  params: P;
};

export enum AsyncActionStatus {
  request = 'request',
  success = 'success',
  error = 'error'
}

export type AsyncRequest = () => Promise<Response>;

export type ARequest<T extends AT, P extends object = {}> = {
  status: AsyncActionStatus.request;
} & ActionTemplate<T, P>;

export type ASuccess<
  T extends AT,
  R extends object = {},
  P extends object = {}
> = {
  result: R;
  status: AsyncActionStatus.success;
} & ActionTemplate<T, P>;

export type AError<T extends AT, P extends object = {}> = {
  error: Error;
  status: AsyncActionStatus.error;
} & ActionTemplate<T, P>;

export type AsyncActions<
  T extends AT,
  R extends object = {},
  P extends object = {}
> = ARequest<T, P> | ASuccess<T, R, P> | AError<T, P>;

export type ToRequest<TWhere> = TWhere extends ARequest<infer T, infer P>
  ? ARequest<T, P>
  : never;

export type ToError<TWhere> = TWhere extends AError<infer T, infer P>
  ? AError<T, P>
  : never;

export type ToSuccess<TWhere> = TWhere extends ASuccess<
  infer T,
  infer R,
  infer P
>
  ? ASuccess<T, R, P>
  : never;
