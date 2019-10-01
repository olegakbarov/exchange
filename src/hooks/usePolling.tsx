import useInterval from './useInterval'
import { useEffect, useCallback, useState } from 'react';

interface PollingConfig {
  url: string;
  onSuccess: any
  onError: any
  interval?: number
}

const usePolling = (config: PollingConfig) => {
  let { 
    url, 
    interval = 5000, 
    onSuccess, 
    onError, 
    ...api 
  } = config; 

  const [isPolling, setPolling] = useState<boolean>(false)

  const performRequest = useCallback(() => 
    fetch(url, api)
      .then(resp => {
        setPolling(true)
        return resp.json().then(data => 
          resp.ok 
            ? data
            : Promise.reject({ status: resp.status, data })
        );
      }).then(onSuccess)
        .catch(err => {
          setPolling(false)
          onError(err)
        }), [url, onSuccess, onError, api])


  // perform initial request
  useEffect(() => { 
    performRequest()
  }, [])

  // start polling with interval
  useInterval(performRequest, interval)

  return [isPolling]
}

export default usePolling;