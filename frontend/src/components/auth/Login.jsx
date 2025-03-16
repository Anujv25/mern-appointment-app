import axios from 'axios'
import { useState ,} from 'react';
import { Route ,Navigate,redirect , useNavigate, Link} from 'react-router-dom';
import { useAuth } from './Context';
import Button from '../atoms/Button';
import InputField from '../molecules/InputField';
const Login = () => {


    const {login}=useAuth()
    const navigate = useNavigate();
    const [formData,setFormData]=useState({email:"",password:""})
    const handleChange=(e)=>{
        console.log(e.target)
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
            
            <InputField type="email" value={formData.email} name='email' onChange={handleChange} placeholder="Email" />
            <InputField type="password" value={formData.password}  name="password" onChange={handleChange} placeholder="Password" />
            <Button label={"Login"} onClick={handleSubmit}/>
            <Link to="/auth/forgot">Forgot Passoword?</Link>
        </div>
    );
}

export default Login