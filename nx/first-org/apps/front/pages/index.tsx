import React, { useState } from 'react';
import styled from '@emotion/styled';
import {Todo} from '@first-org/data'

const StyledPage = styled.div`
  .todo{
    color: red;
  }
`;

export function Index() {
  const [todos, setTodos] = useState<Todo[]>([
    { id:'todo1', title: 'Todo 1' },
    { id:'todo2', title: 'Todo 2' },
  ]);
  const addTodo = ()=> {
    setTodos((prev)=>[
      ...prev,
      {
        id:`todo:${Math.floor(Math.random() * 1000)}`,
        title: `New todo ${Math.floor(Math.random() * 1000)}`,
      },
    ]);
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
