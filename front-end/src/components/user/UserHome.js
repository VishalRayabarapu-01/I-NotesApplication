import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeContent from './HomeContent'
import Notes from './Notes'
import TODO from './TODO'
import Settings from './Settings'
import Signout from './Signout'
import "bootstrap/dist/css/bootstrap.min.css"

const UserHome = () => {

  const location = useLocation();
  let currentPage = location.pathname.substring(6)

  const [isHover, setIsHover] = useState(false);

  const handleHovered = () => {
    setIsHover(true);
  }

  const handleMouseLeaved = () => {
    setIsHover(false);
  }

  const inputRef = useRef(null);
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    //const inputValue = inputRef.current.value;
  };

  const inputObj = { outline: isHover ? 'none' : 'snow', border: '0px', borderBottom: '1px solid black', fontSize: '20px' }

  let contentToShow=null;
  
  if (currentPage === 'home') {
    contentToShow=<HomeContent/>
  } else if (currentPage === 'notes') {
    contentToShow=<Notes/>
  }
  else if (currentPage === 'todo') {
    contentToShow=<TODO/>
  }
  else if (currentPage === 'settings') {
    contentToShow=<Settings/>
  } else if (currentPage === 'signout') {
    contentToShow=<Signout/>
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 bg-dark sidebar vh-100 position-fixed">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
              <div className="fs-5">
                <Link to="/" className="text-light" style={{ textDecoration: "none" }}> <img src="/image/logo192.png" alt="Logo" width="40" height="40" /> My Notes</Link>
              </div>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <Link to='/user/home' className={currentPage === 'home' ? 'nav-link active' : 'nav-link text-white'} aria-current="page"><i className="fa-solid  fa-house"></i> Home</Link>
                </li>
                <li>
                  <Link to="/user/notes" className={currentPage === 'notes' ? 'nav-link active' : 'nav-link text-white'}> <i className="fa-solid fa-copy"></i> Your Notes </Link>
                </li>
                <li>
                  <Link to="/user/todo" className={currentPage === 'todo' ? 'nav-link active' : 'nav-link text-white'}>
                    <i className="fa-solid fa-list-ul"></i> TODO'S
                  </Link>
                </li>
                <li>
                  <Link to="/user/settings" className={currentPage === 'settings' ? 'nav-link active' : 'nav-link text-white'}>
                    <i className="fa-solid fa-gears"></i> Settings
                  </Link>
                </li>
                <li>
                  <Link to="/user/signout" className={currentPage === 'signout' ? 'nav-link active' : 'nav-link text-white'}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sign out
                  </Link>
                </li>
              </ul>
              <hr />
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" className='mx-3' onMouseEnter={handleHovered} onMouseLeave={handleMouseLeaved} onKeyUp={handleKeyUp} ref={inputRef} size={35} style={inputObj}
                  placeholder="Search Note & press enter" />
              </div>
              <div className="h3">Hello Vishal.</div>
            </div>
            <div className="">{contentToShow}</div>
          </main>
        </div>
      </div>
    </>
  )
}

export default UserHome