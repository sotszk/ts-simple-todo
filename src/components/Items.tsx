import React from 'react';
import styled from 'styled-components';
import { Todo } from '../types';

interface Props {
  tasks: Array<Todo>;
  doneTask: (id: number) => void;
}

const Items = ({ tasks, doneTask }: Props) => (
  <ItemWrapper>
    {tasks.map(t => (
      <li onClick={() => doneTask(t.id)} key={t.id}>
        <div></div>
        <span>{t.text}</span>
      </li>
    ))}
  </ItemWrapper>
);

const ItemWrapper = styled.ul`
  margin: 0;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    justify-items: center;
    list-style: none;
    background-color: #efefef;
    font-size: 24px;
    padding: 5px 15px;
    margin-bottom: 2px;
    border-radius: 4px;
    > div {
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 50%;
      background-color: white;
    }
    > span {
      padding-left: 10px;
    }
  }
`;

export default Items;
