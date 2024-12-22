import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
`;

const Main = styled.div`
  width: 400px;
  height: 600px;
  background-color: #192C40;
  box-shadow: 16px 12px 54px 0 rgba(52, 70, 89, 0.49);
  border-radius: 15px;
  font-family: Ruda-Reg;
  padding: 110px 23px 57px 23px;
  position: relative;
  color: #E6D3BF;
`;

const Header = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  text-align: center;
  background-color: #344659;
  border-top: 3px solid #E6D3BF;
  border-bottom: 3px solid #E6D3BF;
  padding: 10px 0;
  margin-bottom: 20px;
  font-family: Ruda-Bold;
  font-size: 24px;
`;

export const RootWrapper = (props) => {
  return (
    <Wrapper>
      <Main>
        <Header>Список задач</Header>
        {props.children}
      </Main>
    </Wrapper>
  );
}