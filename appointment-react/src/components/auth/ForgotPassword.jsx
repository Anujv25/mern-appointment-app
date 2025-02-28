import axios from 'axios'
import {
    Link
  } from "react-router-dom";
import { useState } from 'react';
const ForgotPassword = () => {


    const [enterOtp,setEnterOtp]=useState(false);
    const [otp,setOtp]=useState('');
    const [email,setEmail]=useState('');

    
    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/send-otp',{
            email
        })
        if(response.data){
            setEnterOtp(true)
        }
    }

    const handleOTPSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/verify-otp',{
            email,
            otp:Number(otp)
        })
        if(response.data){
            setEnterOtp(true)
        }
        console.log(response.data)
    }
    return (
        <div>
            <h1>Forgot Password</h1>

            <div>
                {enterOtp?
                 <div>
                        <h1>Enter OTP</h1>
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder="OTP" />
                        <button onClick={handleOTPSubmit}>Submit</button>
                </div>:
                <div>   <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
                        <button onClick={handleSubmit}>Submit</button>
                </div>}
            </div>

            
        </div>
    );
}

export default ForgotPassword