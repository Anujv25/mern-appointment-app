import axios from 'axios'
const Login = () => {

    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/login',{
            email:'test@n.comss',
            password:'Test@123'
        })
        console.log(response.data)
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}

export default Login