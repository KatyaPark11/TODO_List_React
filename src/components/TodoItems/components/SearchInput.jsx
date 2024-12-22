import React from 'react';
import {styled} from 'styled-components';

const Input = styled.input`
  width: 300px;
  &::placeholder {
    font-size: 15px;
    color: #8B7F73;
  }
`;

export const SearchInput = ({value, setValue, setSortedItems}) => {
  const onInputChange = (event) => {
    if (setValue) { 
      setValue(event.nativeEvent.target.value);
      setSortedItems(null);
    }
  }

  return <Input value={value} onChange={onInputChange} placeholder='Введите поисковую строку...' />
}