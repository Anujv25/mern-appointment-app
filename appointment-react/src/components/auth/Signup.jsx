import axios from 'axios'
const Signup = () => {

    const handleSubmit=async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/signup',{
            name:'John Doe',
            email:'test@n.com',
            password:'Test@123'
        })
        console.log(response.data)
    }
    return (
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleSubmit}>Signup</button>
        </div>
    );
}

export default Signup