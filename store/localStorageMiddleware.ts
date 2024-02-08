import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

// @ts-ignore
class LocalStorageMiddleware implements Middleware<{}, RootState> {

  public middleware = (store: any) => (next: any) => (action: any) => {
    const result = next(action);

    if (action.type === 'todos/addTodo' || action.type === 'todos/toggleTodo' || action.type === 'todos/deleteTodo') {
      const todos = store.getState().todos.originalTodos;
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    return result;
  };
}

export default LocalStorageMiddleware;
