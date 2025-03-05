import axios from 'axios'
import {
    Link,useNavigate
  } from "react-router-dom";
import { useState } from 'react';
const ResetPassword = () => {

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

     const navigate = useNavigate();
    // make a post call with token to save password
    const handlePasswordSubmit=async ()=>{
        const response=await axios.put('http://localhost:5000/api/auth/reset-password',formData,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })



        if(response.data){
            navigate("/auth/login")
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      
    }
    
    return (
        <div>
            <h1>Reset Password</h1>

                        <input value={formData.password} onChange={handleChange} type="password" name='password' placeholder="Password" />
                       
    
              <input value={formData.confirmPassword} onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" />
                        <button onClick={handlePasswordSubmit}>Submit</button>
              
       

            
        </div>
    );
}

export default ResetPassword