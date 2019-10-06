import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components/macro";
import NumberFormat from "react-number-format";

interface IProps {
  value: number;
  handleChange: (x: number) => void;
  maxValue: number;
  label?: string;
  disabled?: boolean;
}

interface IValues {
  formattedValue: string;
  value: number;
  floatValue: number;
}

const CurrencyInput = React.memo(
  ({ value, label, handleChange, maxValue, disabled }: IProps) => {
    const onChange = React.useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const nextVal = Number(e.target.value);
        handleChange(nextVal);
      },
      [handleChange]
    );

    const isAllowed = (values: IValues) => {
      return values.value <= maxValue;
    };

    return (
      <Label>
        {label && label}
        <StyledInput
          disabled={disabled}
          allowNegative={false}
          decimalScale={2}
          allowLeadingZeros={false}
          value={value}
          onChange={onChange}
          isAllowed={isAllowed}
        />
      </Label>
    );
  }
);

const StyledInput = styled(NumberFormat)`
  font-size: 22px;
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

const Label = styled.label`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
`;

export default CurrencyInput;
