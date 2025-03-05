import axios from 'axios'
import {
    Link,
    useNavigate
  } from "react-router-dom";
import { useState } from 'react';

const ForgotPassword = () => {

    
    const [enterOtp,setEnterOtp]=useState(false);
    const [otp,setOtp]=useState('');
    const [email,setEmail]=useState('');

    const navigate = useNavigate();


    // make a post request to send otp
    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/send-otp',{
            email
        })
        if(response.data){
            setEnterOtp(true)
            console.log(response.data);
           
        }
    }
    // make a post call to verify otp
    const handleOTPVerify=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/verify-otp',{
            email,
            otp:Number(otp)
        })
        if(response.data){
            localStorage.setItem('token',response.data.token)
            navigate('/auth/reset')

        }
    }
    return (
        <div>
            <h1>Forgot Password</h1>

            <div>
                {enterOtp?
                 <div>
                        <h1>Enter OTP</h1>
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder="OTP" />
                        <button onClick={handleOTPVerify}>Submit</button>
                </div>:
                <div>   <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
                        <button onClick={handleSubmit}>Submit</button>
                </div>}
            </div>

            
        </div>
    );
}

export default ForgotPassword