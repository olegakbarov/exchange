import * as React from "react";
import { useDispatch } from "react-redux";
import usePolling from "../hooks/usePolling";
import { updateRates } from "../actions/rates";
import { ApiResponse } from "../types/api";
import Widget from "../components/Widget";

const Exchange = () => {
  const dispatch = useDispatch();

  const [isPolling] = usePolling({
    url: "https://api.exchangeratesapi.io/latest",
    onSuccess: (resp: ApiResponse) => {
      dispatch(updateRates(resp));
    },
    onError: (err: Error) => console.error(err)
  });

  return <Widget online={isPolling} />;
};
export default Exchange;
