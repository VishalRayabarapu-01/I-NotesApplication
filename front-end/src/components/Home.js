import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
      <div className="m-5">
        <div className="row ">
          <div className="col-6 mt-2">
            <label className='mt-2' style={{fontFamily :"poppins", fontSize : "2em"}}>Your Notes.</label>
            <div  className='pt-2' style={{fontFamily :"poppins", fontSize : "2.5em"}}>Organised.</div>
            <div className='pt-1' style={{fontFamily :"poppins", fontSize : "4em"}}>Effortless.</div>
            <div className="row mt-2">
              <div className="col p-3" style={{fontFamily : "Rubik",fontSize : "20px"}} >Take notes anywhere.Find information faster.Personalised notes applicaiton on cloud-with Everynote
            as your note taking app, nothing falls through the cracks.</div>
            </div>
            <div className="row">
              <div className="col mt-2 text-center">
                <Link to="get-started" className="btn text-light btn-md" style={{background : "linear-gradient(90deg,#E80A89 0%, #F15B2A 100%)"}}>Get Started</Link>
              </div>
            </div>
          </div>
          <div className="col mt-2 text-center">
            <img src="note.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
