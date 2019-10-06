import styled from "styled-components/macro";

const Select = styled.select`
  display: block;
  width: 100%;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 33px;
  background-color: ${p => p.theme.inputBgColor};
  border: none;
  color: ${p => p.theme.fgColor};
  width: 100%;
  margin: 7px 0;
  -webkit-appearance: none;
  padding-left: 5px;
`;

export default Select;
