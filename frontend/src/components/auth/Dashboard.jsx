import { useAuth } from "./Context";
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from "react";
import '../../App.css';
import AppointmentList from "../appointment/AppointmentList";

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

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:5000/api/appointments/${id}`,{
            headers:{ 'Authorization': 'Bearer '+localStorage.getItem('token')}
        })
        .then((response)=>{
            console.log(response)
            getAppointments()
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
                getAppointments()   
    },[query])    
    return (
        <div className="p-4">
            <h3 className="text-2xl font-bold mb-4">Dashboard</h3>
            <div className="flex items-center mb-4">
                <Link to="/appointments" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Add</Link>
                <input 
                    className="search-input border border-gray-300 rounded px-2 py-1 mr-4" 
                    type="text" 
                    placeholder="search" 
                    value={query} 
                    onChange={(e)=>setQuery(e.target.value)}
                />
                <select className="border border-gray-300 rounded px-2 py-1 mr-4">
                    <option>Status</option>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                </select>
                <button className="logoutBtn bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
            </div>
            <div className="bg-white p-4 rounded shadow flex">
                <AppointmentList data={data} handleDelete={handleDelete}/>
            </div>
        </div>
    );
}

export default Dashboard