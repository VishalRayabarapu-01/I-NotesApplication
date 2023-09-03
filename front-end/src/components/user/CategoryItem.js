import React, { useContext, useState } from 'react'
import Notes from './Notes'
import categoryContext from '../../contexts/CategoryContext'
import Swal from 'sweetalert2'
import Loader from '../Loader'
const CategoryItem = (props) => {
  const category = props.category
  const obj = useContext(categoryContext)
  const { deleteCategory, updateCategory } = obj
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="row m-2 p-2">
        <div className="card p-0">
          <h5 className="card-header bg-disable" style={{ fontFamily: 'Nunito', fontWeight: 'bold', fontSize: '1.4em' }}>
            {`#${category.id} :-  ${category.name}`}
            <span><img src="/image/bin.png" className='mx-2' onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: "If you delete, All notes belongs to this category will be deleted !!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete !'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  setIsLoading((prevState) => !prevState)
                  //here the loading is started we are awaiting for this function to execute .so in .finally executes 
                  //first only before the axios del request sent to server . we pass the setLoading fun to 
                  //delete category and set loading false there...
                  await deleteCategory(category.id,setIsLoading)
                }
              }) 
            }} style={{ height: '30px', width: '30px', cursor: 'pointer' }} alt="Delete" /></span>
            <span><img src="/image/edit.png" onClick={() => { updateCategory(category.id) }} style={{ height: '30px', width: '30px', cursor: 'pointer' }} alt="Delete" /></span>
          </h5>
          <div className="card-body">
            {isLoading ? (<div className="mt-4"> <Loader /></div>) : (<Notes notes={category.notes} categoryName={category.name} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryItem
