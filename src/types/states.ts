import { CurrencyCode } from "./enums";

export type AccountState = {
  [key in CurrencyCode]: number;
};

export type RatesState =
  | {
      [key in CurrencyCode]: {
        [key in CurrencyCode]: number;
      };
    }
  | {};

type State = AccountState;

export type RootState = {
  [key: string]: State;
};
