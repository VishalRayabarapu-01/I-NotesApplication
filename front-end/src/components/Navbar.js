import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = () => {
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary">
                <div className="container-fluid">
                <img src="logo192.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                    <Link className="navbar-brand fs-3 px-3">My Notes</Link>
                    <div className="d-flex collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Features</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav> */}
            <nav className="navbar navbar-expand-md  sticky-top bg-body-tertiary bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand fs-3 px-3">
                        <img src="/image/logo.jpg" style={{borderRadius : '4px'}} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                        <Link to="/" className="mx-3 text-light" style={{textDecoration : "none"}}>My Notes</Link>
                    </div>
                    <div className="d-flex">
                        <Link to="/login" className="btn btn-md text-light mx-4" >Log in</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
