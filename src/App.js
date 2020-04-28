import React, {useState, useCallback, useEffect} from 'react';
// import './App.css';

const App = () => {
  const [newTodo, setNewTodo] = useState('');

  const [todos, setTodos] = useState([]);

  const onTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

 const todoSubmitted = useCallback((event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        content: newTodo,
        done: false
      }
    ]);
    setNewTodo('');
  }, [newTodo, todos]);
  
  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);

  return (
    <div>
      <form onSubmit={todoSubmitted}>
        <label htmlFor="newTodo">Enter a ToDo:</label>
        <input
          id = "newTodo"
          name = "newTodo"
          value = {newTodo}
          onChange = {onTodoChange}
        />
        <button>+</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;