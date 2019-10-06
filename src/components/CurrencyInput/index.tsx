import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components/macro";
import NumberFormat from "react-number-format";

interface IProps {
  value: number;
  label: string;
  handleChange: (x: number) => void;
  maxValue: number;
}

const CurrencyInput = React.memo(
  ({ value, label, handleChange, maxValue }: IProps) => {
    const onChange = React.useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);
        if (newVal <= maxValue) {
          handleChange(newVal);
        }
      },
      [handleChange]
    );

    return (
      <Label>
        {label}
        <StyledInput
          decimalScale={2}
          allowNegative={false}
          value={value}
          onChange={onChange}
        />
      </Label>
    );
  }
);

const StyledInput = styled(NumberFormat)`
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
