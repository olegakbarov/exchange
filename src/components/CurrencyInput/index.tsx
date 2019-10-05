import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components/macro";
import NumberFormat from "react-number-format";

interface IProps {
  value: number;
  label: string;
  handleChange: (x: number) => void;
}

const CurrencyInput = React.memo(({ value, label, handleChange }: IProps) => {
  const onChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => handleChange(Number(e.target.value)),
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
});

const StyledInput = styled(NumberFormat)`
  border: 1px solid ${p => p.theme.borderColor};
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${p => p.theme.inputBgColor};
  border: none;
  color: ${p => p.theme.fgColor};
`;

const Label = styled.label`
  display: block;
`;

export default CurrencyInput;
