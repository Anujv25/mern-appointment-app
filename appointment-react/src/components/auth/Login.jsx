import axios from 'axios'
import { useState ,} from 'react';
import { Route ,Navigate,redirect , useNavigate, Link} from 'react-router-dom';
import { useAuth } from './Context';

const Login = () => {


    const {login}=useAuth()
    const navigate = useNavigate();

    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/login',{
            email:'test@n.com',
            password:'Test@123'
        })
        const token=response.data.token

        login(token)
        navigate("/")
       
    }
    return (
        <div>


            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleSubmit}>Login</button>
            <Link to="/auth/forgot">Forgot Passoword?</Link>
        </div>
    );
}

export default Login