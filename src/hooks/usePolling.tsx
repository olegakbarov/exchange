import { useState, useEffect, useRef } from 'react';

interface PollingConfig {
  url: string;
  interval?: number;
  retryCount?: number
  onSuccess: any
  onFailure: any
}

type ReturnType = [boolean, () => void, () => void]

const usePolling = (config: PollingConfig): ReturnType  => {
  let { url, interval = 5000, retryCount = 0, onSuccess, onFailure = () => {}, ...api } = config;
  const [isPolling, togglePolling] = useState(false);

  const persistedIsPolling = useRef<boolean>();
  const isMounted = useRef<boolean>();
  const poll = useRef<NodeJS.Timeout>();

  persistedIsPolling.current = isPolling;

  useEffect(() => {
    isMounted.current = true;
    startPolling();
    return () => {
      isMounted.current = false;
      stopPolling();
    };
  });

  const shouldRetry = retryCount ? true : false;

  const stopPolling = () => {
    if (isMounted.current) {
      if (poll.current) {
        clearTimeout(poll.current);
        poll.current = undefined;
      }
      togglePolling(false);
    }
  };

  const startPolling = () => {
    togglePolling(true);
    runPolling();
  };

  const runPolling = () => {
    const callApi = () => {
      /* onSuccess would be handled by the user of service which would either return true or false
        * true - This means we need to continue polling
        * false - This means we need to stop polling
        */
      fetch(url, api)
        .then(resp => {

          console.log('Fetch success!')

          return resp.json().then(data => {
            if (resp.ok) {
              return data;
            } else {
              return Promise.reject({ status: resp.status, data });
            }
          });
        })
        .then(onSuccess)
        .then(continuePolling => {
          persistedIsPolling.current && continuePolling ? runPolling() : stopPolling();
        })
        .catch(error => {
          console.error('Fetch error!')
          if (shouldRetry && retryCount > 0) {
            onFailure && onFailure(error);
            retryCount--;
            runPolling();
          } else {
            onFailure && onFailure(error);
            stopPolling();
          }
        });
    }

    const timeoutId = setTimeout(callApi, interval);
    poll.current = timeoutId;
  };

  return [isPolling, startPolling, stopPolling];
};

export default usePolling;