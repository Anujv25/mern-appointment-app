import axios from 'axios'
import {useState} from 'react';
import { Link } from 'react-router-dom';
const Signup = () => {
    const [formData,setFormData]=useState({name:"",email:"",password:""})

    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/signup',formData)
        console.log(response.data)
    }

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target})
    }
    return (
        <div>
            <h1>Signup</h1>
            <input type="text" onChange={handleChange} value={formData.name} name='name' placeholder="Name" />
            <input type="email"  onChange={handleChange} value={formData.email}  name="email"placeholder="Email" />
            <input type="password"  onChange={handleChange} name="password" value={formData.password} placeholder="Password" />
            <button onClick={handleSubmit}>Signup</button>
            <p>Alreadt a user ?</p>
            <Link to="/auth/login">Login</Link>
        </div>
    );
}

export default Signup