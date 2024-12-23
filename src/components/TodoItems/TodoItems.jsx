import styled from "styled-components"
import React, {useEffect, useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import {SortButton} from './components/SortButton';
import { SearchSortContainer } from './components/SearchSortContainer';

const ScrollableContainer = styled.div`
  max-height: 330px;
  overflow-y: auto;
   &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
`;

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const { data: todoItems, isLoading } = useData();

  const filterAndSortItems = (items) => {
    const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
    return items
      .filter(todoItem => {
        const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
        return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 2;
      })
      .sort((a, b) => (isSorted ? b.priority - a.priority : 0));
  };

  const todoItemsElements = todoItems ? filterAndSortItems(todoItems).map(item => (
    <TodoItem key={item.id} title={item.title} checked={item.isDone} id={item.id} priority={item.priority} />
  )) : null;

  if (isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  };

  return (
    <TodoItemsContainer>
      <SearchSortContainer>
        <SortButton isSorted={isSorted} onClick={() => setIsSorted(prev => !prev)}>Сорт по приоритету</SortButton>
        <SearchInput value={searchValue} setValue={setSearchValue} />
      </SearchSortContainer>
      <ScrollableContainer>
        {todoItemsElements}
      </ScrollableContainer>
      <NewTodoItem filteredBySearchItems={filterAndSortItems(todoItems)} />
    </TodoItemsContainer>
  );
};