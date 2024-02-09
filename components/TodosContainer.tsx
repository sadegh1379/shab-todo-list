"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  filterTodos,
  loadTodos,
} from "../store/slices/todoSlice";
import { RootState } from "../store/store";
import TodoCard from "./TodoCard";

const TodosContainer: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    dispatch(filterTodos(newFilter));
  };

  useEffect(() => {
    setLoading(true);
    dispatch(loadTodos())
    setLoading(false);
  }, [])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          className="border-b border-gray-300 px-3 py-2 focus:outline-none flex-1"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          className={`flex-1 px-4 py-2 rounded-md ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded-md ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded-md ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("active")}
        >
          Active
        </button>
      </div>
      <div className="min-h-48">
         {todos?.map((todo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={() => handleToggleTodo(todo.id)}
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default TodosContainer;
