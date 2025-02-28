import axios from 'axios'
import { Link } from "react-router-dom";
const Login = () => {

    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/login',{
            email:'test@n.com',
            password:'Test@123'
        })
        console.log(response.data)
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleSubmit}>Login</button>
            {/* <Link to="forgot">Forgot Passoword?</Link> */}
        </div>
    );
}

export default Login