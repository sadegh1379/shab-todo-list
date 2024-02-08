import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import LocalStorageMiddleware from "./middlewares/localStorageMiddleware";

const localStorageMiddlewareInstance = new LocalStorageMiddleware();

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(localStorageMiddlewareInstance.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
