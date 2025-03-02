import axios from 'axios'
import { useState ,} from 'react';
import { Route ,Navigate,redirect , useNavigate, Link} from 'react-router-dom';
import { useAuth } from './Context';

const Login = () => {


    const {login}=useAuth()
    const navigate = useNavigate();
    const [formData,setFormData]=useState({email:"",password:""})
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }   

    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/login',formData)
        const token=response.data.token

        login(token)
        navigate("/")
       
    }
    return (
        <div>


            <h1>Login</h1>
            <input type="email" value={formData.email} name='email' onChange={handleChange} placeholder="Email" />
            <input type="password" value={formData.password}  name="password" onChange={handleChange} placeholder="Password" />
            <button onClick={handleSubmit}>Login</button>
            <Link to="/auth/forgot">Forgot Passoword?</Link>
        </div>
    );
}

export default Login