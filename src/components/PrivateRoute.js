import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = ({ role }) => {
    // const Navigate = useNavigate()
    let user = localStorage.getItem("jwtToken") == null ? false : true;
    console.log(user)
    return (
        <>
            {role === 'user' ? (
                user ? <Outlet /> : <Navigate to="/" />
            ) : (
                user ? <Outlet /> : <Navigate to="/admin" />
            )}
        </>

    )
}

export default PrivateRoute