import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import usePolling from '../hooks/usePolling'
import { updateRates } from '../actions/rates'
import { ApiResponse } from '../types/api'
import { RootState } from '../types/states'

const Exchange = () => {
  const dispatch = useDispatch()

  const [isPolling] = usePolling({
    url: 'https://api.exchangeratesapi.io/latest',
    onSuccess: (resp: ApiResponse) => {
      dispatch(updateRates(resp))
    },
    onError: (err) => console.error(err)
  })

  return (
    <div>
      {isPolling ? 'online' : 'offline'}
      <Table />
    </div>
  )
}

const Table = () => {
  const rates = useSelector((state: RootState) => state.rates)

  return (
    <pre>
      {JSON.stringify(rates)}
    </pre>
  )
}

export default Exchange
