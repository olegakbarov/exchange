import * as React from "react";
import styled from "styled-components/macro";
import { RootState } from "../../reducers";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import CurrencyInput from "../CurrencyInput";
import Header from "./Header";
import { setFromValue, setToValue } from "../../actions/userInput";
import Select from "react-select";

interface IProps {
  online: boolean;
}

const Widget = (p: IProps) => {
  const userInput = useSelector((state: RootState) => state.userInput);
  const account = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  const updateToValue = useCallback((x: number) => dispatch(setToValue(x)), [
    dispatch
  ]);
  const updateFromValue = useCallback(
    (x: number) => dispatch(setFromValue(x)),
    [dispatch]
  );

  return (
    <WidgetRoot>
      <Header online={p.online} />
      <CurrencyInput
        label="from"
        value={userInput.fromValue}
        handleChange={updateFromValue}
      />
      {/* <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      /> */}
      <CurrencyInput
        label="to"
        value={userInput.toValue}
        handleChange={updateToValue}
      />
      <StyledButton>Exchange</StyledButton>
    </WidgetRoot>
  );
};

const WidgetRoot = styled.div`
  width: 300px;
  border: 1px solid ${p => p.theme.borderColor};
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export default React.memo(Widget);
