
import { useAuth } from "./Context";
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from "react";
import '../../App.css';
const Dashboard = () => {
    const {logout}=useAuth()
    const [query,setQuery]=useState('')
    const [data,setData]=useState([])
    const handleLogout=()=>{
        localStorage.removeItem('token')
        logout();
    }
    const getAppointments=()=>{
        axios.get(`http://localhost:5000/api/appointments?query=${query}`,{
            headers:{ 'Authorization': 'Bearer '+localStorage.getItem('token')}
        })
        .then((response)=>{
            console.log(response)
            setData(response.data)
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
            <h3>Dashboard </h3>
           <Link to="/appointments">Add</Link>
            <button onClick={handleLogout}>Logout</button>

            <input type="text" placeholder="search" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <div className="appointment-container">

           
            {data?.map((appointment,index)=>{
                const {_id}=appointment
                return <Link to={`/appointments/${_id}`} className="item" key={appointment._id}>

                    <div>
                    <h3> {index+1}{appointment.description}</h3>
                    <p>{appointment.status}</p>
                    <p>{appointment.location}</p>
                    <p>{appointment.date}</p>
                    </div>
                </Link>
            })}
            </div>
        </div>
    );
}

export default Dashboard