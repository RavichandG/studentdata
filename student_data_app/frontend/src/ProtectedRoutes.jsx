import React from 'react'
import {useSelector} from "react-redux"
import { Outlet } from 'react-router'
import { Navigate } from 'react-router'
const ProtectedRoutes = () => {

    const isAuth = useSelector(state=>state.UserAuthSlice.auth)
        console.log(isAuth)

  return (
    <>
        {isAuth?<Outlet></Outlet>:<Navigate to="/"></Navigate>}
    </>
  )
}

export default ProtectedRoutes