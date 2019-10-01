import { CurrencyCode } from "./enums";

export interface ApiResponse {
  base: CurrencyCode;
  rates: {
    [key in CurrencyCode]: number;
  };
}
