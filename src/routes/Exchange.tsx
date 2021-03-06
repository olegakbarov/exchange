import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import usePolling from "../hooks/usePolling";
import { updateRates } from "../actions/rates";
import { ApiResponse } from "../types/api";
import Widget from "../components/Widget";
import { RootState } from "../reducers";

const Exchange = () => {
  const dispatch = useDispatch();
  const fromCurrency = useSelector(
    (state: RootState) => state.input.fromCurrency
  );

  const [isPolling] = usePolling({
    url: `https://api.exchangeratesapi.io/latest?base=${fromCurrency}`,
    interval: 10000,
    onSuccess: (resp: ApiResponse) => {
      dispatch(updateRates(resp));
    },
    onError: (err: Error) => console.error(err)
  });

  return <Widget isPolling={isPolling} />;
};
export default Exchange;
