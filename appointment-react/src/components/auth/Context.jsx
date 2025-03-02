import React, { createContext, useState, useContext,useEffect } from "react";

// Create a context for auth
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [context , setContext] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setContext({...context,token});
    setLoading(false);
  }, []);
  // Function to login
  const login = (token) => {
    localStorage.setItem('token', token);
    setContext({...context,token});
  };
  const logout=()=>{
    localStorage.removeItem('token')
    setContext({...context,token:null});
  }
  const updateContext=(key,value)=>{
    setContext({...context,[key]:value})
  }
  console.log("Context Data",context)

    // Don't render the children until loading is finished
    if (loading) {
        return null; // or a loading spinner, if you prefer
    }
    
  return (
    <AuthContext.Provider value={{ context,updateContext,login ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};
