import styled from "styled-components/macro";

const Button = styled.button`
  width: 100%;
  background-color: ${p => p.theme.buttonBgColor};
  padding: 10px 30px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  color: ${p => p.theme.white};

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
