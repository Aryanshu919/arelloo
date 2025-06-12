import type { RootState } from '@/store'
import React, { type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const {isAuthenticated} = useSelector((state : RootState) => state.auth );

  if(isAuthenticated){
    return children;
  }
  else{
    return <Navigate to="/signin" />
  }
}

export default PrivateRoute