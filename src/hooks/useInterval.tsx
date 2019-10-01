import { useEffect, useRef } from 'react';

/*
  very much inspired by this:
  https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/
const useInterval = (callback: any, t: number) => {
  const callbackRef = useRef<any>()
  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    const tick = () => { 
      if (callbackRef && callbackRef.current) {
        callbackRef.current() 
      }
    }
    const interval = setInterval(tick, t)

    return () => clearInterval(interval)
  }, [t])
}

export default useInterval 