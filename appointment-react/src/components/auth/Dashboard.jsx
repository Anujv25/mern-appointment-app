
import { useAuth } from "./Context";
const Dashboard = () => {
    const {logout}=useAuth()
    const handleLogout=()=>{
        localStorage.removeItem('token')
        logout();
    }
    return (
        <div>
            <h1>Dashboard </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard