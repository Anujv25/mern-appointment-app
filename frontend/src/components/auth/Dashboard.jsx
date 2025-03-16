import { useAuth } from "./Context";
import { Link} from 'react-router-dom';
import { useState } from "react";
import '../../App.css';
import AppointmentList from "../appointment/AppointmentList";
import HomeTemplate from "../templates/HomeTemplate";
import InputField from "../molecules/InputField";
import useDebounce from "../../hooks/useDebounce";

const Dashboard = () => {
    const {logout}=useAuth();
    const [query,setQuery]=useState('');
    const debouncedText=useDebounce(query,500)
  
    const handleLogout=()=>{
        localStorage.removeItem('token')
        logout();
    }
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }
    return (
        <HomeTemplate>
        <div className="p-4">
            <div className="flex items-center mb-4">
                <Link to="/appointments" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Add</Link>
                <InputField id="search"
                    className="search-input border border-gray-300 rounded px-2 py-1 mr-4" 
                    type="text" 
                    placeholder="search" 
                    value={query} 
                    onChange={handleQueryChange}
                    name="search"
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
              
                <AppointmentList  query={debouncedText}/>
                
            </div>
        </div>
        </HomeTemplate>
    );
}

export default Dashboard