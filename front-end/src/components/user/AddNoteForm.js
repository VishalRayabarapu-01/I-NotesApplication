import React, { useState } from 'react'

const AddNoteForm = () => {

  const [category,setCategory]=useState("")
  const [noteTitle,setNoteTitle]=useState("")
  const [description,setDescriprion]=useState()

  const updateCategory=(e)=>{
    setCategory(e.target.value)
  }
  const updateNoteTitle=(e)=>{
    setNoteTitle(e.target.value)
  }
  const updateDescription=(e)=>{
    setDescriprion(e.target.value)
  }
  return (
    <>
      <div className="text-center fs-2 mt-1" style={{ fontFamily: 'Ubuntu', fontWeight: 'bolder' }}>Add Note :-</div>
      <form>
        <div className="mb-2 mt-1">
          <label htmlFor="categoryName" className="form-label">Category name <span className='text-danger'>*</span></label>
          <input type="text" value={category}  onChange={updateCategory} className="form-control" id="categoryName" aria-describedby="emailHelp" required={true} />
          <div className="form-text">Enter a valid category name to add a note.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">Note title <span className='text-danger'>*</span></label>
          <input type="text" value={noteTitle} onChange={updateNoteTitle} className="form-control" id="Title" required={true} />
        </div>
        <div className="mb-3">
          <textarea name=""  id="" cols="8" rows="4" onChange={updateDescription} className='form-control' required={true} placeholder='Enter your note..'>{description}</textarea>
        </div>
        <div className="text-center"><button type="button" className="btn btn-primary ">Add Note</button></div>
      </form>
    </>
  )
}

export default AddNoteForm
