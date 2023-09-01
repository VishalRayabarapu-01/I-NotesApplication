import React, { useState } from 'react'
import userContext from './UserContext'

const UserState = (props) => {

  const [loggedUser,setLoggedUser] =useState("")
  return (
    <userContext.Provider value={{loggedUser,setLoggedUser}}>
        {props.children}
    </userContext.Provider>
  )
}

export default UserState
