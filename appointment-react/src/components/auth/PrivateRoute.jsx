import React,{useContext} from 'react';
import { Navigate} from 'react-router-dom';
import { AuthContext, } from './Context';
const PrivateRoute = ({ children, ...rest }) => {
  const { context,test } = useContext(AuthContext);
  const token=context?.token
  console.log("TOKEN FROM PRIVATE ROUTE",context,test)
  if (!token) {
    // If no token, redirect to login
    return <Navigate to="auth/login" replace />;
  }

  // If token exists, render the protected page
  return children;
};


export default PrivateRoute;
