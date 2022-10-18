import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c7e92;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #eff4f7;
  border-radius: 15px;
  margin: 20px 0;
  &:hover {
    background-color: #dae3ed;
    ${Remove} {
      opacity: 1;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid rgb(64, 69, 202);
      color: rgb(64, 69, 202);
    `}
`;

const Text = styled.div`
  flex: 1;
  width:400px;
  font-size: 21px;
  color: #495057;
  word-break:break-all;
  &:hover {
    color: rgb(64, 80, 202) ;
  }
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
  const url = "http://localhost:3001/memo";
  const nextId = useTodoNextId();
  const deleteMemo = (path) => {
    fetch(url + `/${path}`, {
      method: "DELETE",
    }).then((res => {
      console.log(res)
    }))
  };
  const patchMemo = (path, check) => {
    const patchedMemo ={
      done : !check
    };
    fetch(url + `/${path}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchedMemo)
    }).then((res => {
      console.log(res)
    }))
  }
  const dispatch = useTodoDispatch();
  const onToggle = () => {
    dispatch({ type: 'TOGGLE', id });
    patchMemo(id, done);
  };
  const onRemove = () => {
    dispatch({type: 'REMOVE', id})
    deleteMemo(id);
};
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);