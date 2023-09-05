import React, { useContext, useEffect } from 'react'
import todoContext from '../../contexts/TodoContext'
import TodoItem from './TodoItem'
const TODO = () => {
  const obj=useContext(todoContext)
  const {todos,getTodos,setTodos}=obj
  useEffect(()=>{
    getTodos();
  },[])
  
  return (
    <>
      <div className="container text-center fs-3">YOUR TODO'S :-</div>
      {
        todos.map(todo=>{
          return <TodoItem todo={todo} todos={todos} setTodos={setTodos} />
        })
      }
    </>
  )
}

export default TODO
