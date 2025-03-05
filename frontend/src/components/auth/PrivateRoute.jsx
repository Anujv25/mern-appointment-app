import React,{useContext} from 'react';
import { Navigate} from 'react-router-dom';
import { AuthContext, } from './Context';
// import jwt_decode from "jwt-decode";
const PrivateRoute = ({ children, ...rest }) => {
  const { context } = useContext(AuthContext);
  const token=context?.token

  const isTokenValid=(token)=>{
          // Decode the JWT token
          const decodedToken = jwt_decode(token);

          // Get the expiration time (exp)
          const expTimestamp = decodedToken.exp;

          // Get the current timestamp
          const currentTimestamp = Math.floor(Date.now() / 1000)

          if (currentTimestamp > expTimestamp) {
            return false
          } 

          return true
  }
  const hasAccess=token 
  if (!hasAccess) {
    // If no token, redirect to login
    return <Navigate to="/auth/login" replace />;
  }

  // If token exists, render the protected page
  return children;
};


export default PrivateRoute;
