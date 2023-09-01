import axios, { HttpStatusCode } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../Loader'

const AddNoteForm = () => {

  const [category, setCategory] = useState("")
  const [noteTitle, setNoteTitle] = useState("")
  const [description, setDescriprion] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const updateCategory = (e) => {
    setCategory(e.target.value)
  }
  const updateNoteTitle = (e) => {
    setNoteTitle(e.target.value)
  }
  const updateDescription = (e) => {
    setDescriprion(e.target.value)
  }

  const navigate = useNavigate();

  const checkTokenExist = () => {
    if (localStorage.getItem('tokenForValidation') === null) {
      Swal.fire({
        title: "Please Login again",
        icon: "error"
      }).then(() => {
        navigate('/login')
      })
      return false;
    } else {
      return true;
    }
  }
  const submitDetails = () => {
    if ((category.length !== 0) && (noteTitle.length !== 0) && (description.length !== 0)) {
      if (checkTokenExist()) {
        setIsLoading((prevState) => !prevState)
        const config = {
          headers: {
            'Authorization': localStorage.getItem('tokenForValidation'),
            'CategoryName': category
          }
        };
        let url = "http://localhost:9092/user/addNote"
        let data = { 'title': noteTitle, 'content': description }
        axios.post(url, data, config).then(res => {
          if (res.status === HttpStatusCode.Created) {
            Swal.fire("Success", "Your Note has been added successfully!", "success")
          }
        }).catch(err => {
          if (err.response) {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: `${err.response.data} !!! `
            })
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: `Internal Errors occured Try Again ${err.message} !!! `
            })
          }
        }).finally(() => {
          setIsLoading(false)
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: 'Please Fill All Fields',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  return (
    <>
      <div className="text-center fs-2 mt-1" style={{ fontFamily: 'Ubuntu', fontWeight: 'bolder' }}>Add Note :-</div>
      {isLoading ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <form>
          <div className="mb-2 mt-1">
            <label htmlFor="categoryName" className="form-label">Category name <span className='text-danger'>*</span></label>
            <input type="text" value={category} onChange={updateCategory} className="form-control" id="categoryName" aria-describedby="emailHelp" required={true} />
            <div className="form-text">Enter a valid category name to add a note.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">Note title <span className='text-danger'>*</span></label>
            <input type="text" value={noteTitle} onChange={updateNoteTitle} className="form-control" id="Title" required={true} />
          </div>
          <div className="mb-3">
            <textarea name="" id="" value={description} cols="8" rows="4" onChange={updateDescription} className='form-control' required={true} placeholder='Enter your note..'>{description}</textarea>
          </div>
          <div className="text-center"><button type="button" onClick={submitDetails} className="btn btn-primary ">Add Note</button></div>
        </form>
      )}
    </>
  )
}

export default AddNoteForm
