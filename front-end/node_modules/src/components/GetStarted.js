import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from './Navbar'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

const GetStarted = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailUpdated = (e) => {
    setEmail(e.target.value)
  }

  const passwordUpdated = (e) => {
    setPassword(e.target.value)
  }

  const nameUpdated = (e) => {
    setName(e.target.value);
  }

  const submitDetails = () => {
    if (name.length >= 4) {
      if (email.includes("@")) {
        if (password.length > 8) {
          let url = "http://localhost:9092/auth/add"
          let obj = {
            username: email,
            password: password,
            name: name
          }
          axios.post(url, obj).then(res => {
            if (res.status === 201) {
              Swal.fire({
                icon: 'success',
                text: 'Account created.'
              })
              setEmail("")
              setName("")
              setPassword("")
            }
          }).catch(error => {
            if (error.response) {
              console.log(error.response.data)
              Swal.fire({
                icon: 'error',
                title: 'Error Occured while creating account.',
                confirmButtonText: 'OK',
                text: error.response.data
              }).then(() => {
                setEmail("")
                setName("")
                setPassword("")
              })
            }
          })

        } else {
          Swal.fire({
            icon: 'info',
            text: 'Password should be greater than 8 words.'
          })
        }
      } else {
        Swal.fire({
          icon: 'info',
          text: 'Enter a valid E-mail id.'
        })
      }
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Enter valid name.'
      })
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2 ">
            <div className="mycard bg-light" >
              <div className="text-center ">
                <img src="/image/signup.png" className='mt-1' style={{ padding: '10px', height: '9em', filter: 'drop-shadow(2px 3px 10px)' }} alt="" />
              </div>
              <div className="text-center fs-1 fw-bold" style={{ padding: '10px', paddingTop: '0px' }}>SignUp Here!</div>
              <form>
                <div className="form-group mt-3 mx-3">
                  <label className="fs-5">Name <span className='text-danger'>*</span></label>
                  <input type="text" value={name} onChange={nameUpdated} required={true} name="name" className="form-control mt-1 " />
                </div>
                <div className="form-group mt-3 mx-3">
                  <label className="fs-5">Username <span className='text-danger'>*</span></label>
                  <input type="email" value={email} onChange={emailUpdated} required={true} name="username" className="form-control mt-1" />
                </div>
                <div className="form-group mt-3 mx-3">
                  <label className="fs-5">Password <span className='text-danger'>*</span></label>
                  <input type="password" value={password} onChange={passwordUpdated} required={true} name="password" className="form-control mt-1" />
                </div>
                <div style={{ paddingBottom: '20px', paddingTop: '30px' }}>
                  <div className="row">
                    <div className="col px-1">
                      <button type="button" onClick={submitDetails} className="btn btn-lg bg-info float-end"><i className='fa-solid fa-circle-check fa-beat-fade'></i> OK</button>
                    </div>
                    <div className="col px-1">
                      <input type="button" onClick={() => {
                        setName('')
                        setPassword('')
                        setEmail('')
                      }} className="btn btn-lg bg-warning" value="Reset" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetStarted
