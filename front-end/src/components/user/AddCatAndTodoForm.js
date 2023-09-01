import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../Loader'
const AddCatAndTodoForm = () => {

  //pending for todo.
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const updateCategory = (e) => {
    setCategory(e.target.value)
  }

  const [todo, setTodo] = useState("")
  const updateTodo = (e) => {
    setTodo(e.target.value)
  }

  const navigate = useNavigate();

  const submitCategoryData = () => {
    if (category.length !== 0 && (category !== 'null')) {
      if(localStorage.getItem('tokenForValidation')===null){
        Swal.fire({
          title: "Please Login again",
          icon : "error"
        }).then(()=>{
          navigate('/login')
        })
      }else{
        const config = {
          headers:{
            'Authorization' : localStorage.getItem('tokenForValidation')
          }
        };
        setIsLoading((prevState) => !prevState)
        let url="http://localhost:9092/user/addCategory"
        let data={'name' : category}
        axios.post(url,data,config).then(response=>{
          if(response.status === 201){
            Swal.fire({
              title : 'success',
              text : `Category Added Successfully with name : ${category}`,
              icon : 'success'
            })
            setCategory("")
          }
        }).catch(error=>{
          if(error.response){
            Swal.fire({title:"Error !",icon:'error',text:`${error.response.data}`})
            setCategory("")
          }else{
            Swal.fire({
              title : 'Error',
              text : `Error occured while adding category name : ${category} Try again !!!!`,
              icon : 'Error'
            })
          }
        }).finally(() => {
          setIsLoading(false)
        });
      }
    } else {
      Swal.fire({
        title: "Enter valid category Name",
        icon: 'warning',
        timer : 2000
      }).then(()=>{
        setCategory('')
      })
    }
  }

  const submitTodoData = () => {
    console.log(category.length)
  }

  return (
    <>
      <div className="text-center fs-2 mt-1" style={{ fontFamily: 'Ubuntu', fontWeight: 'bolder' }}>Add Category :-</div>
      {isLoading ? (
        <div className="mt-4"> <Loader /></div>
      ) : (
        <div className="mb-2 mt-1">
        <label htmlFor="categoryName" className="form-label">Category name <span className='text-danger'>*</span></label>
        <input type="text" value={category} placeholder='Enter the category name' onChange={updateCategory} className="form-control" id="categoryName" aria-describedby="emailHelp" required={true} />
        <div className="text-center mt-3"><button type="button" onClick={submitCategoryData} className="btn btn-primary ">Add Category</button></div>
      </div>
      )}
      <hr />
      <div className="text-center fs-2" style={{ fontFamily: 'Ubuntu', fontWeight: 'bolder' }}>Add a TODO :-</div>
      <div className="mb-2 mt-1">
        <label htmlFor="description" className="form-label">TODO <span className='text-danger'>*</span></label>
        <input type="text" value={todo} placeholder='Add a TODO' onChange={updateTodo} className="form-control" id="description" aria-describedby="emailHelp" required={true} />
        <div className="text-center mt-3"><button type="button" onClick={submitTodoData} className="btn btn-primary ">Add A TODO</button></div>
      </div>
    </>
  )
}

export default AddCatAndTodoForm
