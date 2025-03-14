import { useAuth } from "./Context";
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState ,useCallback} from "react";
import '../../App.css';
import AppointmentList from "../appointment/AppointmentList";
import { useAppointMents, useDeleteAppointment ,} from "../../hooks/useAppointmentsResource"
import useDebounce from "../../hooks/useDebounce";

const Dashboard = () => {
    const {logout}=useAuth();
    const [query,setQuery]=useState('');
   
    const { data: appointments, isLoading, error } = useAppointMents(query);
    const handleLogout=()=>{
        localStorage.removeItem('token')
        logout();
    }
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error fetching users</p>;
    return (
        <div className="p-4">
            <h3 className="text-2xl font-bold mb-4">Dashboard</h3>
            <div className="flex items-center mb-4">
                <Link to="/appointments" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Add</Link>
                <input id="search"
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
                <AppointmentList data={appointments} />
            </div>
        </div>
    );
}

export default Dashboard