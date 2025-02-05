import { useState } from 'react';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';

let nextId = 0;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showPendingOnly, setShowPendingOnly] = useState(false); // New filter state

  function handleAdd(text) {
    setTodos([...todos, { id: nextId++, text, completed: false }]);
  }

  function handleRemove(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleEdit(id, newText) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }

  function handleToggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Filter todos based on the "showPendingOnly" state
  const filteredTodos = showPendingOnly
    ? todos.filter((todo) => !todo.completed)
    : todos;

  return (
    <>
      <NewTodo onAdd={handleAdd} />
      <label>
        <input
          type="checkbox"
          checked={showPendingOnly}
          onChange={() => setShowPendingOnly(!showPendingOnly)}
        />
        Show pending tasks only
      </label>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
      <footer>{filteredTodos.length} tasks displayed</footer>
    </>
  );
}

export default TodoList;
