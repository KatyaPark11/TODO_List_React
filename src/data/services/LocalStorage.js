const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY';

const getTodoItems = () => {
  const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
  if (!rawData) return [];
  try {
    const data = JSON.parse(rawData);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const LocalStorage = {
  getTodoItemsFromLocalStorage: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getTodoItems());
      }, 500);
    });
  },

  saveTodoItemToLocalStorage: (todoItem) => {
    return new Promise((resolve) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = [...todoItems, todoItem];
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

  deleteTodoItemFromLocalStorage: (todoItemId) => {
    return new Promise((resolve) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = todoItems.filter(item => item.id !== todoItemId);
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

  updateTodoItemInLocalStorage: (id, checked, priority) => {
    return new Promise((resolve) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const itemToUpdate = todoItems.find(item => item.id === id);
        if (itemToUpdate) {
          itemToUpdate.isDone = checked;
          itemToUpdate.priority = priority;
        }
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(todoItems));
        resolve();
      })
    });
  }
}