import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const LoginForm = () => {

    const navigate = useNavigate();

    const styles = {
        backdropFilter: 'blur(20px)',
        height: "87vh",
        backgroundSize: "cover",
        background: "url(login.jpeg)"
    }
    const style1 = {
        backdropFilter: '5px',
        background: "no-repeat",
        border: "1px solid white",
        borderRadius: "20px"
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    //use navigate hook is used to redirect to another page by push method.

    const emailUpdated = (e) => {
        setEmail(e.target.value)
    }

    const passwordUpdated = (e) => {
        setPassword(e.target.value)
    }

    // const authenticateUser = async () => {
    //     let url = "http://localhost:9092/auth/login";
    //     let obj = {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: {
    //             email: email,
    //             password: password
    //         }
    //     };
    //     const response = await fetch(url, obj)
    //     const data = await response.json()
    //     console.log(data);
    // }

    const validateUser = () => {
        let url = "http://localhost:9092/auth/login";
        let obj = {
            email: email,
            password: password
        }
        axios.post(url, obj)
            .then((response) => {
                localStorage.setItem("token", response.data.jwtToken)
                localStorage.setItem("user", response.data.username)
                navigate("/user/home")
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status !== 200) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error Occured !!!',
                            confirmButtonText: 'OK',
                            text: error.response.data
                        }).then(() => {
                            setEmail("")
                            setPassword("")
                        })
                    }
                }
            })
    }

    const detailsSubmitted = () => {
        if (email.includes("@")) {
            validateUser()
        } else {
            Swal.fire({
                icon: 'info',
                text: 'Enter a valid Credentials',
                showConfirmButton: false,
                timer: 1900,
            })
        }
    }
    return (
        <>
            <div style={styles} >
                <div className="container mt-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="card mt-5" style={style1}>
                        <div className="mt-4"></div>
                        <div className="card-body">
                            <div className="row mt-1">
                                <div className="row">
                                    <label className='fs-1 text-light'>Sign in</label>
                                    <label className='mt-2'>New User ? <Link to="/get-started" style={{ textDecoration: "none" }}>Create an account</Link></label>
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <label className="text-light">Username <span className="text-danger">*</span></label>
                                <input type="text" required value={email} onChange={emailUpdated} className="form-control mt-1" />
                            </div>
                            <div className="form-group mt-1">
                                <label className="text-light">Password <span className="text-danger">*</span></label>
                                <input type="password" required value={password} onChange={passwordUpdated} className="form-control mt-1" />
                            </div>
                            <div className="text-center mt-4">
                                {/* <input type="submit" value="Submit" className="btn bt-danger mt-3" /> */}
                                <input type="button" onClick={detailsSubmitted} value="Submit" className="btn text-light btn-md" style={{ background: "linear-gradient(90deg,#E80A89 0%, #F15B2A 100%)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm
