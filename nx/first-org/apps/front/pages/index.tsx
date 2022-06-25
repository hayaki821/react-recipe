import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import {Todo} from '@first-org/data'

const StyledPage = styled.div`
  .todo{
    color: red;
  }
`;

export function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetch('/api/todo')
      .then((_) => _.json())
      .then(setTodos);
  }, []);
  const addTodo = ()=> {
    fetch('/api/todo', {
      method: 'POST',
      body: '',
    })
      .then((_) => _.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      });
  }
  return (
    <StyledPage>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={'todo'}
            >
              {todo.title}
          </li>
        ))}
      </ul>
      <button id={'add-todo'} onClick={addTodo}>
          Add Todo
      </button>
    </StyledPage>
  );
}

export default Index;
