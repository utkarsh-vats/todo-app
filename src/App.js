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
    if(!newTodo.trim())
      return;
    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false
      },
      ...todos
    ]);
    setNewTodo('');
  }, [newTodo, todos]);
  
  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  const markAllDone = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true
      }
    });
    setTodos(updatedTodos)
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
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input 
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>
              Remove ToDo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;