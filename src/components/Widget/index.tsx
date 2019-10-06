import * as React from "react";
import styled from "styled-components/macro";
import { RootState } from "../../reducers";
import { setFromValue, setFromCurr, setToCurr } from "../../actions/userInput";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import CurrencyInput from "../CurrencyInput";
import Header from "./Header";
import Select from "../Select";
import { CurrencyCode } from "../../types/enums";

interface IProps {
  online: boolean;
}

const Widget = (p: IProps) => {
  const userInput = useSelector((state: RootState) => state.userInput);
  const account = useSelector((state: RootState) => state.account);
  const rates = useSelector((state: RootState) => state.rates);
  const dispatch = useDispatch();

  const updateFromValue = (x: number) => {
    if (x <= account[userInput.fromCurrency]) {
      dispatch(setFromValue(x));
    }
  };

  const options = Object.keys(account);
  const changeFromCurr = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as CurrencyCode;
    dispatch(setFromCurr(code));
  };

  const changeToCurr = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as CurrencyCode;
    dispatch(setToCurr(code));
  };

  const targetCurrencyPrice =
    rates[userInput.fromCurrency] &&
    rates[userInput.fromCurrency][userInput.toCurrency];

  return (
    <WidgetRoot>
      <Header online={p.online} />
      <ExchangeRate>
        {targetCurrencyPrice ? (
          <span>
            1 {userInput.fromCurrency} = {targetCurrencyPrice}{" "}
            {userInput.toCurrency}
          </span>
        ) : (
          "Loading..."
        )}
      </ExchangeRate>
      <InputRow>
        <CurrencyInput
          label="from"
          value={userInput.fromValue}
          handleChange={updateFromValue}
          maxValue={account[userInput.fromCurrency] || 0}
        />
        <SelectWrapper>
          You have {account[userInput.fromCurrency]}
          <Select value={userInput.fromCurrency} onChange={changeFromCurr}>
            {options.map((code: string) => (
              <option key={code}>{code}</option>
            ))}
          </Select>
        </SelectWrapper>
      </InputRow>
      <InputRow>
        You receive:{" "}
        {userInput.fromValue && userInput.fromValue * targetCurrencyPrice}
        <SelectWrapper>
          You have {account[userInput.toCurrency]}
          <Select value={userInput.toCurrency} onChange={changeToCurr}>
            {options.map((code: string) => (
              <option key={code}>{code}</option>
            ))}
          </Select>
        </SelectWrapper>
      </InputRow>
      <StyledButton>Exchange</StyledButton>
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

const ExchangeRate = styled.div`
  font-size: ${p => p.theme.baseFontSize};
  text-align: center;
  padding: 40px 0;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;

  > * {
    width: 140px;
  }
`;

const SelectWrapper = styled.div`
  font-size: ${p => p.theme.baseFontSize};
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export default React.memo(Widget);
