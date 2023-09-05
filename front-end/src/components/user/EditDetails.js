import axios, { HttpStatusCode } from 'axios';
import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2';
import Loader from '../Loader'
import userContext from '../../contexts/UserContext'
function EditDetails() {

    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadForPassword, setIsLoadForPassword] = useState(false);

    const updateName = (e) => {
        setName(e.target.value)
    }
    const [password, setPassword] = useState('')
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const submitPassword = () => {
        console.log(password.length)
        if (password.length > 8) {
            Swal.fire({
                title: 'Are you sure?',
                text: `Your password will set to ${password} from now`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsLoadForPassword((prev) => { return !prev })
                    const config = {
                        headers: {
                            'Authorization': localStorage.getItem('tokenForValidation')
                        }
                    };
                    let url = 'https://inotes-application.onrender.com/user/updatePassword'
                    let body = { 'password': password }
                    axios.put(url, body, config).then(res => {
                        if (res.status === HttpStatusCode.Ok) {
                            Swal.fire({ title: 'success', text: `Password updated : ${password}`, icon: 'success' })
                            setPassword("")
                        } else {
                            Swal.fire("Error", "Something went wrong!", "error");
                        }
                    }).catch(err => {
                        if (err.response) {
                            Swal.fire({ title: "Error !", icon: 'error', text: `${err.response.data}` })
                        } else {
                            Swal.fire("Something went wrong", "Please try again later!", "warning")
                        }
                        setPassword("")
                    }).finally(() => { setIsLoadForPassword(false) })
                }
            })
        } else {
            Swal.fire({ icon: 'info', text: 'Password should be greater than 8 words.' })
        }
    }

    const userObj = useContext(userContext);
    const submitName = () => {
        if (name.length !== 0) {
            setIsLoading((prevState) => !prevState)
            const config = {
                headers: {
                    'Authorization': localStorage.getItem('tokenForValidation')
                }
            };
            let url = 'https://inotes-application.onrender.com/user/updateName'
            let body = { 'name': name }
            axios.put(url, body, config).then(res => {
                if (res.status === HttpStatusCode.Ok) {
                    Swal.fire({ title: 'success', text: `Name updated : ${name}`, icon: 'success' })
                    setName("")
                    userObj.setLoggedUser(() => { return name })
                } else {
                    Swal.fire("Error", "Something went wrong!", "error");
                }
            }).catch(err => {
                if (err.response) {
                    Swal.fire({ title: "Error !", icon: 'error', text: `${err.response.data}` })
                } else {
                    Swal.fire("Something went wrong", "Please try again later!", "warning")
                }
                setName("")
            }).finally(() => { setIsLoading(false) })
        } else {
            Swal.fire({ title: "Enter valid Name", icon: 'warning', timer: 2000 }).then(() => { setName('') })
        }

    }
    return (
        <>
            <div className="fs-3 mt-1" style={{ fontFamily: 'Ubuntu', fontWeight: 'bolder' }}>Edit Name :-</div>
            {isLoading ? (<div className="mt-4"> <Loader /></div>) : (
                <div className="mb-2 mt-1">
                    <input type="text" placeholder='Enter name' value={name} onChange={updateName} className="form-control" />
                    <div className="text-center mt-3"><button onClick={submitName} className='btn btn-primary btn-md'>Submit</button></div>
                </div>
            )}
            <hr />
            <div className="fs-3 mt-1" style={{ fontFamily: 'Ubuntu', fontWeight: 'bolder' }}>Edit password :-</div>
            {isLoadForPassword ? (<div className="mt-4"> <Loader /></div>) : (
                <div className="mb-2 mt-1">
                    <input type="password" placeholder='Enter password' value={password} onChange={updatePassword} className="form-control" />
                    <div className="text-center mt-3"><button onClick={submitPassword} className='btn btn-primary btn-md'>Submit</button></div>
                </div>
            )}
        </>
    )
}

export default EditDetails
