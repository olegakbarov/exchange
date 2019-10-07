import * as React from "react";
import styled from "styled-components/macro";
import { RootState } from "../../reducers";
import { setFromValue, setFromCurr, setToCurr } from "../../actions/userInput";
import { runTransaction } from "../../actions/account";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import CurrencyInput from "../CurrencyInput";
import Header from "./Header";
import Select from "../Select";
import { CurrencyCode } from "../../types/enums";

interface IProps {
  isPolling: boolean;
}

const Widget = (p: IProps) => {
  const { fromCurrency, toCurrency, fromValue } = useSelector(
    (state: RootState) => state.userInput
  );
  const account = useSelector((state: RootState) => state.account);
  const currencyCodes = Object.keys(account);
  const rates = useSelector((state: RootState) => state.rates);
  const online = useSelector((state: RootState) => state.ui.online);
  const dispatch = useDispatch();

  const updateFromValue = (x: number) => {
    if (x <= account[fromCurrency]) {
      dispatch(setFromValue(x));
    }
  };

  const changeFromCurr = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as CurrencyCode;
    dispatch(setFromCurr(code));
  };

  const updateToCurr = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as CurrencyCode;
    dispatch(setToCurr(code));
  };

  const isButtonDisabled = () => {
    if (!fromValue) {
      return true;
    } else if (!online) {
      return true;
    } else if (!rates[fromCurrency]) {
      return true;
    } else if (fromCurrency === toCurrency) {
      return true;
    } else if (fromValue > account[fromCurrency]) {
      return true;
    } else {
      return false;
    }
  };

  const targetCurrencyPrice = rates[fromCurrency]
    ? rates[fromCurrency][toCurrency]
    : 0;

  const formattedTargetValue = Number(
    (fromValue * targetCurrencyPrice).toFixed(2)
  );

  const calculatedValue = fromValue && fromValue * targetCurrencyPrice;

  const handleTransaction = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(
      runTransaction(fromCurrency, toCurrency, fromValue, formattedTargetValue)
    );

    dispatch(setFromValue(0));
  };

  return (
    <WidgetRoot>
      <Header online={online && p.isPolling} />
      <FormattedText>
        {targetCurrencyPrice ? (
          <span>
            1 {fromCurrency} = {targetCurrencyPrice} {toCurrency}
          </span>
        ) : (
          "Loading..."
        )}
      </FormattedText>
      <InputRow>
        <CurrencyInput
          disabled={!targetCurrencyPrice}
          value={fromValue}
          handleChange={updateFromValue}
          maxValue={account[fromCurrency] || 0}
        />
        <SelectWrapper>
          <Select value={fromCurrency} onChange={changeFromCurr}>
            {currencyCodes
              .filter((code: string) => account[code] > 0)
              .map((code: string) => (
                <option key={code}>{code}</option>
              ))}
          </Select>
        </SelectWrapper>
      </InputRow>
      <InputRow>
        <CurrencyInput
          disabled
          value={calculatedValue}
          handleChange={() => calculatedValue}
        />
        <SelectWrapper>
          <Select value={toCurrency} onChange={updateToCurr}>
            {currencyCodes.map((code: string) => (
              <option key={code}>{code}</option>
            ))}
          </Select>
        </SelectWrapper>
      </InputRow>
      <FormattedText>
        You are about to exchange {fromValue} {fromCurrency} to{" "}
        {formattedTargetValue} {toCurrency}
      </FormattedText>
      <Balances>
        <h3>Your balance:</h3>
        <table>
          <tbody>
            {Object.keys(account).map(k => {
              return (
                account[k] > 0 && (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{account[k]}</td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </Balances>
      <StyledButton disabled={isButtonDisabled()} onClick={handleTransaction}>
        Exchange
      </StyledButton>
    </WidgetRoot>
  );
};

const WidgetRoot = styled.div`
  width: 300px;
  border: 1px solid ${p => p.theme.borderColor};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 10px 30px -5px ${p => p.theme.shadowColor};
`;

const FormattedText = styled.div`
  font-size: ${p => p.theme.baseFontSize};
  text-align: center;
  padding: 10px 0 20px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;

  > * {
    width: 48%;
  }
`;

const Balances = styled.div`
  font-size: ${p => p.theme.baseFontSize};

  table {
    width: 100%;
  }

  table tbody tr {
    border-bottom: 1px dotted black;
  }

  table tbody tr td :nth-child(2) {
    text-align: right;
  }
`;

const SelectWrapper = styled.div`
  font-size: ${p => p.theme.baseFontSize};
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export default React.memo(Widget);
