import { useState } from 'react';

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAdd() {
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  }

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default NewTodo;
