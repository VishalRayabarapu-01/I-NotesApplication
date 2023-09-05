import axios, { HttpStatusCode } from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../Loader'
import { useContext } from 'react';
import CategoryContext from '../../contexts/CategoryContext';
const NotesItem = (props) => {
    const note = props.note;
    const [isLoading, setIsLoading] = useState(false);
    const categoryContext = useContext(CategoryContext)
    const { category, setCategory } = categoryContext
    const deleteNote = (id, categoryName) => {
        setIsLoading((prevState) => !prevState)
        const config = {
            headers: {
                'Authorization': localStorage.getItem('tokenForValidation')
            }
        };
        let url = `https://inotes-application.onrender.com/user/deleteNote?categoryName=${categoryName}&id=${id}`
        axios.delete(url, config).then(res => {
            if (res.status === HttpStatusCode.Ok) {
                Swal.fire({ title: "Success!", text: `Note deleted with id ${id}`, icon: 'success' })
                let newCategory = category.map((item) => {
                    if (item.name === categoryName) {
                        let notes = item.notes;
                        let newNotes = notes.filter((note) => { return note.id !== id })
                        item.notes = newNotes
                    }
                    return item;
                })
                setCategory(newCategory)
            }
        }).catch(err => {
            if (err.response) {
                Swal.fire(`Failed`, `${err.response.data}`, `error`)
            } else {
                Swal.fire({ title: "Error occured Try again!!!", icon: 'error' })
            }
        }).finally(() => { setIsLoading(() => { return false }) })
    }
    const UpdateTitle = (id, categoryName) => {
        Swal.fire({
            title: 'Enter Note Title to update',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Update',
            showLoaderOnConfirm: true,
            preConfirm: (title) => {
                const config = {
                    headers: {
                        'Authorization': localStorage.getItem('tokenForValidation')
                    }
                };
                let url = `https://inotes-application.onrender.com/user/updateNoteTitle`
                let data = { 'title': title, 'id': id }
                return axios.put(url, data, config).then(res => {
                    if (res.status === HttpStatusCode.Ok) {
                        Swal.fire({ title: "Success!", text: `Title of note changed with ${title} for id ${id}`, icon: 'success' })
                        let newCategory = category.map((item) => {
                            if (item.name === categoryName) {
                                let notes = item.notes;
                                let newNotes = notes.map(note => {
                                    if (note.id === id) {
                                        note.title = title;
                                        const date = new Date();
                                        let currentDay = String(date.getDate()).padStart(2, '0');
                                        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
                                        let currentYear = date.getFullYear();
                                        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
                                        note.lastModifiedDate = currentDate
                                    }
                                    return note;
                                })
                                item.notes = newNotes
                            }
                            return item;
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
        <>
            <div className="card border-info mb-3">
                <div className="card-header bg-dark text-white d-flex justify-content-between">
                    <div>
                        {`#${note.id}`}
                        <span className='mx-3 mt-1' onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this !!!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, Delete !'
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    deleteNote(note.id, props.categoryName)
                                }
                            })
                        }}><i className="fa-solid fa-trash text-white" style={{ cursor: 'pointer' }}></i></span>
                        <span onClick={() => { UpdateTitle(note.id, props.categoryName) }}><i className="fa-solid fa-pencil text-white" style={{ cursor: 'pointer' }}></i></span>
                    </div>
                    <div>{`Created on : ${note.createdDate}`}</div>
                </div>
                {isLoading ? (<div className="my-3"> <Loader /></div>) : (
                    <div className="card-body">
                        <h5 className="card-title"><span className='text-muted'>Title : </span>{`${note.title}`}</h5>
                        <p className="card-text"><span className='text-muted'>Content : </span>{note.content}</p>
                    </div>
                )}
                <div className="card-footer bg-transparent border-success">{`Last Modified on : ${note.lastModifiedDate === null ? 'None' : note.lastModifiedDate}`}</div>
            </div>
        </>
    )
}

export default NotesItem
