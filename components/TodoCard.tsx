interface TodoCardProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  text,
  completed,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white border border-gray-200 rounded-md shadow-md">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-500"
          checked={completed}
          onChange={onToggle}
        />
        <p className={`text-lg ${completed ? "line-through text-gray-500" : ""}`}>
          {text}
        </p>
      </div>
      <button
        className="text-red-500 hover:text-red-700 focus:outline-none"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoCard;
