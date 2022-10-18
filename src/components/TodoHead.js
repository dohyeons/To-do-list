import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  border-radius: 16px 16px 0 0;
 background-color: rgb(64, 69, 202);
  
  
  h1 {
    margin: 0;
    font-size: 36px;
    color: white
  }
  .day {
    margin-top: 4px;
    color: white;
    font-size: 21px;
  }
  .tasks-left {
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
    
  }
`;

function TodoHead({undoneTasks}) {
  const todos = useTodoState();
  // const undoneTasks = todos.filter(todo => !todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">아직 {undoneTasks.length}개 남음...</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;