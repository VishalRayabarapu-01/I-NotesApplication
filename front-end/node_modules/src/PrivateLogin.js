import { Navigate } from "react-router-dom";
const PrivateLogin = ({ children }) => {
    const token=localStorage.getItem('tokenForValidation')
    return (
        (token===null) ? <Navigate to='/login' /> :  children
    )
}

export default PrivateLogin
