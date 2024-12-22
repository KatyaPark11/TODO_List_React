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
  const [sortedItems, setSortedItems] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  const { data: todoItems, isLoading } = useData();

  useEffect(() => {
    if (isSorted && sortedItems) {
      const filteredBySearchItems = todoItems.filter((todoItem) => {
          const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
          const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
          return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 3;
      });
      setSortedItems(filteredBySearchItems.sort((a, b) => b.priority - a.priority));
    }  else {
      setSortedItems(null);
    }
  }, [todoItems]);

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  const filteredBySearchItems = todoItems.filter((todoItem) => {
      const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
      const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
      return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 2;
  });

  const onClickHandler = () => {
    setIsSorted(prev => !prev);
    setSortedItems(filteredBySearchItems.sort((a, b) => b.priority - a.priority));
  };

  const todoItemsElements = (isSorted && sortedItems) ? sortedItems.map((item, index) => {
    return <TodoItem
        key={item.id}
        title={item.title}
        checked={item.isDone}
        id={item.id}
        priority={item.priority} />;
  }) : filteredBySearchItems.map((item, index) => {
      return <TodoItem
          key={item.id}
          title={item.title}
          checked={item.isDone}
          id={item.id}
          priority={item.priority} />;
  });

  return (
    <TodoItemsContainer>
      <SearchSortContainer>
      <SortButton isSorted={isSorted} onClick={onClickHandler}>Сорт по приоритету</SortButton>
        <SearchInput value={searchValue} setValue={setSearchValue} setSortedItems={setSortedItems} />
      </SearchSortContainer>
      <ScrollableContainer>
        {todoItemsElements}
      </ScrollableContainer>
      <NewTodoItem filteredBySearchItems={filteredBySearchItems} setSortedItems={setSortedItems}/>
    </TodoItemsContainer>
  )
}