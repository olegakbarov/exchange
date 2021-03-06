import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components/macro";
import NumberFormat from "react-number-format";

interface IProps {
  value: number;
  handleChange: (x: number) => void;
  maxValue?: number;
  disabled?: boolean;
}

interface IValues {
  formattedValue: string;
  value: number;
  floatValue: number;
}

const CurrencyInput = React.memo(
  ({ value, handleChange, maxValue, disabled }: IProps) => {
    const onChange = React.useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const nextVal = Number(e.target.value);
        handleChange(nextVal);
      },
      [handleChange]
    );

    const isAllowed = (values: IValues) =>
      maxValue ? values.value <= maxValue : true;

    return (
      <StyledInput
        disabled={disabled}
        allowNegative={false}
        decimalScale={2}
        allowLeadingZeros={false}
        value={value}
        onChange={onChange}
        isAllowed={isAllowed}
      />
    );
  }
);

const StyledInput = styled(NumberFormat)`
  font-size: 17px;
  background-color: ${p => p.theme.inputBgColor};
  color: ${p => p.theme.fgColor};
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 5px;
  border-radius: 4px;
  text-align: right;
  border: none;
  width: 100%;
  margin: 7px 0;
`;

export default CurrencyInput;
