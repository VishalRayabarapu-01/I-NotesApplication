import React, { useState } from 'react'
import categoryContext from './CategoryContext'
import axios, { HttpStatusCode } from 'axios'
import Swal from 'sweetalert2'
const CategoryState = (props) => {
    const initialCategory = []
    const [category, setCategory] = useState(initialCategory)
    const getCategories = () => {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('tokenForValidation')
            }
        }
        let url = 'http://localhost:9092/user/getCategories'
        axios.get(url, config).then(response => {
            if (response.status === HttpStatusCode.Ok) {
                setCategory(response.data)
            }
        }).catch(error => {
            if (error.response) {
                Swal.fire({ title: "Error !", icon: 'error', text: `${error.response.data}` })
            } else {
                Swal.fire("Something went wrong", "Please try again later", 'error');
            }
        })
    }
    const deleteCategory = (id, setIsLoading) => {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('tokenForValidation')
            }
        };
        let url = `http://localhost:9092/user/deleteCategory?id=${id}`
        axios.delete(url, config).then(res => {
            if (res.status === HttpStatusCode.Ok) {
                Swal.fire({ title: "Success!", text: `Category deleted with id ${id}`, icon: 'success' })
            }
        }).catch(err => {
            if (err.response) {
                Swal.fire(`Failed`, `${err.response.data}`, `error`)
            } else {
                Swal.fire({ title: "Error occured Try again!!!", icon: 'error' })
            }
        }).finally(() => {
            //here we are stoping the loading but we need to remove the card also.
            //its not the correct way that after deleting we should refresh the notes : user/notes not 
            //to show the content instead of loading..
            // will not set here..=>setIsLoading(()=>{return false})
            //if we are not setting to false then the state is true ..so when rerendering next card shows
            //loading so set state to false....
            setIsLoading(() => { return false })
            let newCategory = category.filter((item) => { return item.id !== id })
            setCategory(newCategory)
            //getCategories()
        })
    }
    const updateCategory = (id) => {
        Swal.fire({
            title: 'Enter the Category name to update',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Update',
            showLoaderOnConfirm: true,
            preConfirm: (name) => {
                const config = {
                    headers: {
                        'Authorization': localStorage.getItem('tokenForValidation')
                    }
                };
                let url = `http://localhost:9092/user/updateCategory`
                let data = { 'name': name, 'id': id }
                return axios.put(url, data, config).then(res => {
                    if (res.status === HttpStatusCode.Ok) {
                        Swal.fire({ title: "Success!", text: `Category name changed with ${name} for id ${id}`, icon: 'success' })
                        let newCategory=category.map(item => {
                            if (item.id === (id)) {
                                item.name = name
                            } return item;
                        })
                        setCategory(newCategory)
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
    return (
        <categoryContext.Provider value={{ category, setCategory, getCategories, deleteCategory, updateCategory }}>
            {props.children}
        </categoryContext.Provider>
    )
}

export default CategoryState
