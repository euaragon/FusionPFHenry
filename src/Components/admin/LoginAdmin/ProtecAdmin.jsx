import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';

function ProtecAdmin({children}) {
    const LoginAdmin = useSelector((state) => state.loginUser)

    if(LoginAdmin.rol !== "admin") {

        swal("Error","Usuario no autorizado","error");

        return <Navigate to="/" /> 
    } 
        
   
  return (
    <div>{children}</div>
  )
}

export default ProtecAdmin