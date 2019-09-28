import * as React from 'react'
import { AccountState, RootState } from '../types/states'
import { connect } from 'react-redux'

type Props = AccountState

const Exchange = (p: Props) => {
  console.log(p)
  return <div>{p.USD}</div>
}

export default connect(
  (state: RootState) => ({
    ...state.balance
  }),
  {}
)(Exchange);
