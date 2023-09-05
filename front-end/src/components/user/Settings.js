import axios, { HttpStatusCode } from 'axios'
import React, { useState,useContext } from 'react'
import Swal from 'sweetalert2'
import EditDetails from './EditDetails'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'
import userContext from '../../contexts/UserContext'
const Settings = () => {

  const [details, setDetails] = useState({
    name: "---------",
    username: "---------",
    password: "---------",
    registeredDate: "---------"
  })
  const [isLoading, setIsLoading] = useState(false);
  const GetUserDetails = () => {
    setIsLoading((prevState) => !prevState)
    const config = {
      headers: {
        'Authorization': localStorage.getItem('tokenForValidation')
      }
    };
    axios.get('https://inotes-application.onrender.com/user/get', config).then((response) => {
      let obj = {
        name: response.data.name, username: response.data.username, password: response.data.password, registeredDate: response.data.registrationDate
      }
      setDetails(obj)
    }).catch(err => {
      if (err.response) {
        Swal.fire({ icon: "error", title: "Error!", text: `${err.response.data} !!! ` })
      }
    }).finally(() => { setIsLoading(false) })
  }
  const userObj = useContext(userContext);
  const navigate=useNavigate()
  const deleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete!'
    }).then(result => {
      if (result.isConfirmed) {
        setIsLoading((prevState) => !prevState)
        let url = 'https://inotes-application.onrender.com/user/deleteUser'
        const config = {
          headers: {
            'Authorization': localStorage.getItem('tokenForValidation')
          }
        };
        axios.delete(url, config).then(response => {
          if (response.status === HttpStatusCode.Ok) {
            localStorage.removeItem('tokenForValidation')
            localStorage.removeItem('user')
            userObj.setLoggedUser('')
            Swal.fire("Deleted Successfully", "Your Account has been deleted successfully!!", "success").then(()=>{
              navigate('/')
            })
          }
        }).catch(error => {
          if (error.response) {
            Swal.fire(`Failed`, `${error.response.data}`, `error`)
          }
        }).finally(() => { setIsLoading(false) })
      }
    })
  }
  return (
    <>
      {isLoading ? (
        <div className="mt-5"> <Loader /></div>
      ) : (
        <div className="container">
          <button onClick={deleteAccount} className='btn btn-danger btn-md mt-3'>Delete Account</button>
          <div className='text-center'>
            <img src="/image/settings.png" style={{ padding: '10px', height: '9em', filter: 'drop-shadow(1px 2px 3px)' }} alt="" />
          </div>
          <div className="row mt-4">
            <div className="col" style={{ fontFamily: "poppins" }}>
              <div className="row p-2 mt-2">
                <div className="col" style={{ fontSize: '1.5em' }}>Your Name</div>
                <div className="col-1 fs-4">:</div>
                <div className="col mt-1" style={{ fontSize: '1.3em' }}>{details.name}</div>
              </div>
              <div className="row p-2 mt-1">
                <div className="col" style={{ fontSize: '1.5em' }}>Username</div>
                <div className="col-1 fs-4">:</div>
                <div className="col mt-1" style={{ fontSize: '1.3em' }}>{details.username}</div>
              </div>
              <div className="row p-2 mt-1">
                <div className="col" style={{ fontSize: '1.5em' }}>Password</div>
                <div className="col-1 fs-4">:</div>
                <div className="col mt-1" style={{ fontSize: '1.3em' }}>{details.password}</div>
              </div>
              <div className="row p-2 mt-1">
                <div className="col" style={{ fontSize: '1.5em' }}>Registered Date</div>
                <div className="col-1 fs-4">:</div>
                <div className="col mt-1" style={{ fontSize: '1.3em' }}>{details.registeredDate}</div>
              </div>
              <div className="row text-center mt-3"><div className="col"><button className='btn btn-primary btn-md' onClick={GetUserDetails}>Get Details</button></div></div>
            </div>
            <div className="col">
              <EditDetails />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings
