import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import usePolling from '../hooks/usePolling'
import { updateRates } from '../actions/rates'
import { ApiResponse } from '../types/api'
import { RootState } from '../types/states'

const Exchange = () => {
  const rates = useSelector((state: RootState) => state.rates)
  const dispatch = useDispatch()

  const [isPolling, startPolling] = usePolling({
    url: 'https://api.exchangeratesapi.io/latest',
    onSuccess: (resp: ApiResponse) => {
      dispatch(updateRates(resp))
    },
    onFailure: (args) => console.log(args)
  })

  // console.log('rendered Exchange!')
  // console.log(rates)

  React.useEffect(() => {
    startPolling()
  }, [])

  return (
    <div>
      {isPolling ? 'online' : 'offline'}
      <pre>
        {JSON.stringify(rates)}
      </pre>
    </div>
  )
}

export default Exchange
