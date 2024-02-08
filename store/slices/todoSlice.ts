import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  originalTodos: Todo[];
}

const initialState: TodoState = {
  todos: [],
  originalTodos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: state.todos.length + 1,
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      state.originalTodos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      const originalTodo = state.originalTodos.find(
        (todo) => todo.id === action.payload
      );
      if (todo && originalTodo) {
        todo.completed = !todo.completed;
        originalTodo.completed = !originalTodo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.originalTodos = state.originalTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },
    filterTodos: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      switch (filter) {
        case "completed":
          state.todos = state.originalTodos.filter((todo) => todo.completed);
          break;
        case "active":
          state.todos = state.originalTodos.filter((todo) => !todo.completed);
          break;
        default:
          state.todos = [...state.originalTodos];
          break;
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
      state.originalTodos = state.originalTodos.filter(
        (todo) => !todo.completed
      );
    },
    loadTodos: (state) => {
      const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];

      state.todos = [...storedTodos];
      state.originalTodos = [...storedTodos];
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, filterTodos, clearCompleted, loadTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
