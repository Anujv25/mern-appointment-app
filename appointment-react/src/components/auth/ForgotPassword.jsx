import axios from 'axios'
import {
    Link
  } from "react-router-dom";
import { useState } from 'react';
const ForgotPassword = () => {
    const [enterOtp,setEnterOtp]=useState(false)
    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/send-otp',{
            email:'anuj@yopmail.com',
        })
        if(response.data.message==='OTP sent successfully'){
            setEnterOtp(true)
        }
        console.log(response.data)
    }

    const handleOTPSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/send-otp',{
            email:'anuj@yopmail.com',
        })
        if(response.data.message==='OTP sent successfully'){
            setEnterOtp(true)
        }
        console.log(response.data)
    }
    if(enterOtp){
        return (
            <div>
                <h1>Enter OTP</h1>
                <input type="text" placeholder="OTP" />
                <button onClick={handleOTPSubmit}>Submit</button>
            </div>          
        )
    }
    return (
        <div>
            <h1>Forgot Password</h1>
            <input type="email" placeholder="Email" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default ForgotPassword