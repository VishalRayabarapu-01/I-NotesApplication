import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import HomeContent from './HomeContent'
import Categories from './Categories'
import TODO from './TODO'
import Settings from './Settings'
import userContext from '../../contexts/UserContext'
import "bootstrap/dist/css/bootstrap.min.css"
import axios, { HttpStatusCode } from 'axios'
import Swal from 'sweetalert2'

const UserHome = () => {

  const userObj = useContext(userContext);
  // //const navigate = useNavigate(); we can also use navigator to navigate but not best in this case.
  // console.log(userObj.loggedUser)
  // if (userObj.loggedUser === "") {
  //     window.location.href = "/login";
  //     //navigate("/login")
  // }

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

  let contentToShow = null;

  if (currentPage === 'home') {
    contentToShow = <HomeContent />
  } else if (currentPage === 'notes') {
    contentToShow = <Categories />
  }
  else if (currentPage === 'todo') {
    contentToShow = <TODO />
  }
  else if (currentPage === 'settings') {
    contentToShow = <Settings />
  }
const navigate=useNavigate()
  const signOutUser =()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout !'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('tokenForValidation')
        localStorage.removeItem('user')
        userObj.setLoggedUser('')
        Swal.fire(
          'Logged out!',
          'Successfully logged out from this device.',
          'success'
        ).then(()=>{
          navigate('/')
        })
      }
    })
  }

  useEffect(()=>{
    const config = {
      headers:{
        'Authorization' : localStorage.getItem('tokenForValidation')
      }
    };
    axios.get('https://inotes-application.onrender.com/user/get',config).then((response)=>{
      userObj.setLoggedUser(response.data.name)
    }).catch(err=>{
      if(err.response.status===HttpStatusCode.Unauthorized){
        Swal.fire({icon: "error",title: "Error!",text: `${err.response.data} !!! ` })
        navigate('/login')
      }
      if(err.response){
        Swal.fire({icon: "error",title: "Error!",text: `${err.response.data} !!! ` })
      }
    })
  },[])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 bg-dark sidebar vh-100 position-fixed">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
              <div className="fs-5">
                <Link to="/" className="text-light" style={{ textDecoration: "none" }}> <img src="/image/logo.jpg" alt="Logo" width="40" height="40" /> My Notes</Link>
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
                  <button onClick={signOutUser} className={currentPage === 'signout' ? 'nav-link active' : 'nav-link text-white'}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sign out
                  </button>
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
              <div className="h3">Hello {`${userObj.loggedUser}`}.</div>
            </div>
            <div className="">{contentToShow}</div>
          </main>
        </div>
      </div>
    </>
  )
}

export default UserHome