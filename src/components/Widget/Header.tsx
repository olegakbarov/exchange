import * as React from "react";
import styled from "styled-components/macro";
import { FiMoon, FiSun } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { toggleTheme } from "../../actions/ui";

interface IProps {
  online: boolean;
}

export default (p: IProps) => {
  const themeName = useSelector((state: RootState) => state.ui.themeName);
  const dispatch = useDispatch();
  const handleClick = React.useCallback(
    (_: any) => {
      dispatch(toggleTheme());
    },
    [dispatch]
  );

  return (
    <HeaderRoot>
      <Network online={p.online}>
        You are {p.online ? "online" : "offline"}
      </Network>
      <ToggleThemeButton onClick={handleClick}>
        {themeName === "Light" ? <FiMoon /> : <FiSun />}
      </ToggleThemeButton>
    </HeaderRoot>
  );
};

const HeaderRoot = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Network = styled("div")<{ online: boolean }>`
  font-size: 14px;
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: ${p =>
      p.online ? p.theme.successGreen : p.theme.errorRed};
    margin-right: 5px;
  }
`;

const ToggleThemeButton = styled.button`
  border: none;
  background-color: ${p => p.theme.bgColor};
  vertical-align: top;
  padding: 0;
  margin: 0;
  color: ${p => p.theme.fgColor};
  align-content: center;

  & svg {
    font-size: 17px;
    stroke: ${p => p.theme.fgColor};
  }

  &:hover {
    cursor: pointer;
  }
`;
