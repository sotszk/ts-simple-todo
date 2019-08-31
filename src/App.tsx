import React, { useState } from 'react';
import styled from 'styled-components';
import Items from './components/Items';
import { Todo } from './types';

interface State {
  taskList: Array<Todo>;
}

const getTasks = (taskList: Todo[]) => {
  const todoList = [];
  const doneList = [];

  for (let t of taskList) {
    if (t.status === 'todo') {
      todoList.push(t);
      continue;
    }
    doneList.push(t);
  }

  // NOTE: Array#forEach を使うと型推論が効かない？
  // taskList.forEach(t => {
  //   if (t.status === 'todo') {
  //     todoList.push(t);
  //     return;
  //   }
  //   doneList.push(t);
  // });

  return [todoList, doneList];
};

const initialState = {
  taskList: [],
};

const App = () => {
  const [state, setState] = useState<State>(initialState);
  const [todoText, setTodoText] = useState<string>('');

  const doneTask = (id: number) => {
    const clonedfTaskList = state.taskList.map(t => {
      if (t.id === id) {
        t.status = 'done';
        t.completedAt = new Date();
      }
      return t;
    });

    setState({ taskList: clonedfTaskList });
  };

  const addTask = () => {
    const taskList = [...state.taskList];
    const id = state.taskList.length;
    taskList.push({
      id,
      text: todoText,
      status: 'todo',
      createdAt: new Date(),
    });
    setState({ taskList });
    setTodoText('');
  };

  const [todo, done] = getTasks(state.taskList);
  return (
    <Wrapper>
      <h1>TODO APP with TypeScript</h1>
      <Heading>Todo Tasks</Heading>
      <Items tasks={todo} doneTask={doneTask}></Items>
      <Heading>Done Tasks</Heading>
      <Items tasks={done} doneTask={doneTask}></Items>
      <AddTask>
        <input
          type="text"
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
        ></input>
        <button type="button" onClick={addTask}>
          add new task
        </button>
      </AddTask>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  max-width: 640px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  margin-bottom: 10px;
`;

const AddTask = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  > input {
    height: 20px;
    width: 200px;
  }
  > div {
    margin-left: 10px;
    padding: 3px 10px;
    border: 1px solid #333;
    color: #efefef;
    background-color: #333;
    border-radius: 3px;
  }
`;

export default App;
