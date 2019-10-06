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
  const userInput = useSelector((state: RootState) => state.userInput);
  const account = useSelector((state: RootState) => state.account);
  const options = Object.keys(account);
  const rates = useSelector((state: RootState) => state.rates);
  const online = useSelector((state: RootState) => state.ui.online);
  const dispatch = useDispatch();

  const updateFromValue = (x: number) => {
    if (x <= account[userInput.fromCurrency]) {
      dispatch(setFromValue(x));
    }
  };

  const changeFromCurr = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as CurrencyCode;
    dispatch(setFromCurr(code));
  };

  const changeToCurr = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as CurrencyCode;
    dispatch(setToCurr(code));
  };

  const isButtonDisabled = () => {
    const { fromCurrency, fromValue, toCurrency } = userInput;

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

  const targetCurrencyPrice =
    rates[userInput.fromCurrency] &&
    rates[userInput.fromCurrency][userInput.toCurrency];

  const calculatedValue =
    userInput.fromValue && userInput.fromValue * targetCurrencyPrice;

  const handleTransaction = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(
      runTransaction(
        userInput.fromCurrency,
        userInput.toCurrency,
        userInput.fromValue,
        userInput.fromValue * targetCurrencyPrice
      )
    );

    dispatch(setFromValue(0));
  };

  return (
    <WidgetRoot>
      <Header online={online && p.isPolling} />
      <FormattedText>
        {targetCurrencyPrice ? (
          <span>
            1 {userInput.fromCurrency} = {targetCurrencyPrice}{" "}
            {userInput.toCurrency}
          </span>
        ) : (
          "Loading..."
        )}
      </FormattedText>
      <InputRow>
        <CurrencyInput
          disabled={!targetCurrencyPrice}
          value={userInput.fromValue}
          handleChange={updateFromValue}
          maxValue={account[userInput.fromCurrency] || 0}
        />
        <SelectWrapper>
          <Select value={userInput.fromCurrency} onChange={changeFromCurr}>
            {options
              .filter((code: string) => account[code] > 0)
              .map((code: string) => (
                <option key={code}>{code}</option>
              ))}
          </Select>
        </SelectWrapper>
      </InputRow>
      <InputRow>
        <CurrencyInput
          value={calculatedValue}
          handleChange={() => calculatedValue}
          maxValue={account[userInput.fromCurrency] || 0}
        />
        <SelectWrapper>
          <Select value={userInput.toCurrency} onChange={changeToCurr}>
            {options.map((code: string) => (
              <option key={code}>{code}</option>
            ))}
          </Select>
        </SelectWrapper>
      </InputRow>
      <FormattedText>
        You are about to exchange {userInput.fromValue} {userInput.fromCurrency}{" "}
        to {userInput.fromValue && userInput.fromValue * targetCurrencyPrice}{" "}
        {userInput.toCurrency}
      </FormattedText>
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
  padding: 20px 0;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;

  > * {
    width: 48%;
  }
`;

const SelectWrapper = styled.div`
  font-size: ${p => p.theme.baseFontSize};
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export default React.memo(Widget);
