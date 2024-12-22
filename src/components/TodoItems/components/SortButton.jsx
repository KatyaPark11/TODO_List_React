import React from 'react';
import styled, {css} from 'styled-components';

const selectedCss = css`
  background-color: #344659;
`

const nonSelectedCss = css`
  background-color: #192C40;
`

const Button = styled.button(props => {
    return `
    padding: 5px;
    border: 2px solid #E6D3BF; 
    border-radius: 6px;
    &::placeholder {
      font-size: 15px;
      color: #8B7F73;
    }
    ${props.isSorted ? selectedCss : nonSelectedCss};
  `;
})

export const SortButton = ({onClick, isSorted}) => {
  return (
    <Button onClick={onClick} isSorted={isSorted} title="Сортировка по приоритету">Сортировка</Button>
  );
};