import React, { useContext, useState } from 'react'
import todoContext from '../../contexts/TodoContext'
import Swal from 'sweetalert2'
import Loader from '../Loader'
const TodoItem = (props) => {
    const todo = props.todo
    const obj = useContext(todoContext)
    const { updateTodo, deleteTodo ,todoCompleted} = obj
    console.log(todo)
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <div className="container mt-2">
                <div className="container">
                    <div className="bg-dark text-white m-2 p-2" style={{ borderRadius: '8px' }}>
                        <div className='mx-1'>
                            <i onClick={() => { updateTodo(todo.id) }} style={{ cursor: 'pointer' }} className="mx-2 fa-solid fa-pen"></i>
                            <i onClick={() => {
                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: "You cant revert this !!!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, Delete !'
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        setIsLoading((prevState) => !prevState)
                                        await deleteTodo(todo.id, setIsLoading)
                                    }
                                })
                            }} style={{ cursor: 'pointer' }} className="mx-2 fa-solid fa-trash-can"></i>
                            <i onClick={()=>{setIsLoading((prevState) => !prevState);todoCompleted(todo.id,setIsLoading)}} style={{ cursor: 'pointer' }} className="mx-2 fa-sharp fa-solid fa-check"></i>
                        </div><hr className='m-1' />
                        {isLoading ? (<div className="mt-2"> <Loader /></div>) : (
                            <span className='mx-2' style={{ textDecoration: (todo.isCompleted === 'false') ? 'none' : 'line-through red' }}>
                            {todo.description}
                        </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoItem
