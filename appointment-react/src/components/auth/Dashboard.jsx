
import { useAuth } from "./Context";
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from "react";
const Dashboard = () => {
    // const {logout}=useAuth()
    const [query,setQuery]=useState('')
    const handleLogout=()=>{
        localStorage.removeItem('token')
        // logout();
    }
    const getAppointments=()=>{
        axios.get(`http://localhost:5000/api/appointments?query=${query}`,{
            headers:{ 'Authorization': 'Bearer '+localStorage.getItem('token')}
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
                getAppointments()   
    },[query])    
    return (
        <div>
            <h1>Dashboard </h1>
           <Link to="/appointments">Appointments</Link>
            {/* <button onClick={handleLogout}>Logout</button> */}

            <input type="text" placeholder="search" value={query} onChange={(e)=>setQuery(e.target.value)}/>
        </div>
    );
}

export default Dashboard