
import { useAuth } from "./auth/Context";
import axios from 'axios'
const Appointments = () => {
    const {logout}=useAuth()
    const handleAdd=async ()=>{
        const response=await axios.post('http://localhost:5000/api/appointments',{
            date:'2025-04-02',
            description:'Test-TEst',
            startTime:'2025-04-02T10:00:00.000Z',
            endTime:'2025-04-02T11:00:00.000Z',
            location:'prayagraj',
            status:'confirmed'
        },{headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }})
    }
    return (
        <div>
            <h1>Add Appointment </h1>
            <input type="time" value="" onChange={(e)=>console.log(e.target.value)}/>
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Appointments