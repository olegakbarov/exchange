import { Currency } from "./enums"

export type AccountState = {
  [key in keyof typeof Currency]: number
}

type State = AccountState

export type RootState = {
  [key: string]: State
}