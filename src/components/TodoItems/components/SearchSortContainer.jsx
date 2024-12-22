import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  border-bottom: 2px solid #E6D3BF;
  padding-bottom: 20px; 
  gap: 20px;
`;

export const SearchSortContainer = ({children, style}) => {
  return <Root style={style}>{children}</Root>
}