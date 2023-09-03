import React from 'react'
import NotesItem from './NotesItem'
function Notes(props) {
  const notes = props.notes
  return (
    <>
      <div className="row">
          {
            notes.map((note) => {
              return <div className="col-6"><NotesItem note={note} categoryName={props.categoryName} /></div>
            })
          }
      </div>
    </>
  )
}

export default Notes
