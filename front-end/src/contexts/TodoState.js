import React, { useState } from 'react'
import todoContext from './TodoContext'
import axios, { HttpStatusCode } from 'axios'
import Swal from 'sweetalert2'
const TodoState = (props) => {
    const initialTodos = []
    const [todos, setTodos] = useState(initialTodos)
    const getTodos = () => {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('tokenForValidation')
            }
        }
        let url = 'https://inotes-application.onrender.com/user/getTodos'
        axios.get(url, config).then(response => {
            if (response.status === HttpStatusCode.Ok) {
                setTodos(response.data)
            }
        }).catch(error => {
            if (error.response) {
                Swal.fire({ title: "Error !", icon: 'error', text: `${error.response.data}` })
            } else {
                Swal.fire("Something went wrong", "Please try again later", 'error');
            }
        })
    }
    const updateTodo = (id) => {
        Swal.fire({
            title: 'Enter TODO to update',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Update',
            showLoaderOnConfirm: true,
            preConfirm: (description) => {
                const config = {
                    headers: {
                        'Authorization': localStorage.getItem('tokenForValidation')
                    }
                };
                let url = `https://inotes-application.onrender.com/user/updateTodoDescription`
                let data = { 'description': description, 'id': id }
                return axios.put(url, data, config).then(res => {
                    if (res.status === HttpStatusCode.Ok) {
                        Swal.fire({ title: "Success!", text: `TODO changed with ${description}`, icon: 'success' })
                        let newTodos = todos.map(todo => {
                            if (todo.id === id) {
                                todo.description = description
                            }
                            return todo;
                        })
                        setTodos(newTodos)
                    }
                }).catch(err => {
                    if (err.response) {
                        Swal.showValidationMessage(`Failed : ${err.response.data}`)
                    } else {
                        Swal.showValidationMessage("Something went wrong!")
                    }
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }
    const deleteTodo = (id, setIsLoading) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('tokenForValidation')
            }
        };
        let url = `https://inotes-application.onrender.com/user/deleteTodo?id=${id}`
        axios.delete(url, config).then(res => {
            if (res.status === HttpStatusCode.Ok) {
                Swal.fire({ title: "Success!", text: `TODO deleted`, icon: 'success' })
                let newTodo = todos.filter((item) => { return item.id !== id })
                setTodos(newTodo)
            }
        }).catch(err => {
            if (err.response) {
                Swal.fire(`Failed`, `${err.response.data}`, `error`)
            } else {
                Swal.fire({ title: "Error occured Try again!!!", icon: 'error' })
            }
        }).finally(() => {
            setIsLoading(() => { return false })
        })
    }
    const todoCompleted = (id, setIsLoading) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('tokenForValidation')
            }
        };
        let url = `https://inotes-application.onrender.com/user/updateTodoCompletion`
        let data = { 'isCompleted': `true`, 'id': id }
        return axios.put(url, data, config).then(res => {
            if (res.status === HttpStatusCode.Ok) {
                Swal.fire({ title: "Success!", text: `TODO completed .`, icon: 'success' })
                let newTodos = todos.map(todo => {
                    if (todo.id === id) {
                        todo.isCompleted = `true`
                    }
                    return todo;
                })
                setTodos(newTodos)
            }
        }).catch(err => {
            if (err.response) {
                Swal.fire(`Failed`, `${err.response.data}`, `error`)
            } else {
                Swal.fire({ title: "Error occured Try again!!!", icon: 'error' })
            }
        }).finally(() => {
            setIsLoading(() => { return false })
        })
    }
    return (
        <todoContext.Provider value={{ todos, setTodos, getTodos, updateTodo, deleteTodo, todoCompleted }}>
            {props.children}
        </todoContext.Provider>
    )
}

export default TodoState
