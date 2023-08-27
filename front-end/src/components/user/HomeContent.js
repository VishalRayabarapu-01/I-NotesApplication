import React, { useEffect, useRef, useState } from 'react'
import './HomeContent.css'
import AddNoteForm from './AddNoteForm'
import AddCatAndTodoForm from './AddCatAndTodoForm';
import InstructionsForAddingNote from './InstructionsForAddingNote';
import WelcomeContentHome from './WelcomeContentHome';
const HomeContent = () => {

  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimated(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [])

  const todoRef = useRef(null);

  const noteRef = useRef(null);

  const addTodo = () => {
    todoRef.current.scrollIntoView({ behaviour: 'smooth' });
  }
  const addNote = () => {
    noteRef.current.scrollIntoView({ behaviour: 'smooth' });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <button className="btn btn-md m-2" style={{ background: 'rgba(139,129,218,255)', color: 'white' }} onClick={addTodo}><i className="fa-regular fa-square-plus"></i> Add TODO</button>
          <button className="btn btn-md m-2 " style={{ background: 'rgba(139,129,218,255)', color: 'white' }} onClick={addNote}><i className="fa-regular fa-square-plus"></i> Add Note</button>
        </div>
      </div>
      <div className="row">
        <WelcomeContentHome getAnimatedValue={animated}/>
      </div>
      <div className="row mt-3" ref={noteRef}>
        <InstructionsForAddingNote textAnimation={animated} />
      </div><hr />
      <div className="row m-1 p-1" ref={todoRef}>
        <div className="col">
          <AddNoteForm />
        </div>
        <div className="col">
          <AddCatAndTodoForm />
        </div>
      </div>
    </>
  )
}

export default HomeContent
