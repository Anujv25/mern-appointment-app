import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios'
import { useDeleteAppointment } from '../../hooks/useAppointmentsResource';
const AppointmentList = ({ data }) => {
    const navigate = useNavigate(); // Hook for redirection
    const deleteUser = useDeleteAppointment();

    const handleClick = (_id) => {
        // Navigate to the appointment detail page
        navigate(`/appointments/${_id}`);
    };
    const updateDate=(date)=>{
        return moment(date).format('DD/MM/YYYY');
    }
    const updateTime=(time)=>{
        return moment(time).format('hh:mm A');
    }
    const handleLike=async (_id,favourite)=>{
        try {
            const response = await axios({
              method:"put",
              url: `http://localhost:5000/api/appointments/favourite/${_id}`,
              data: {favourite:!favourite},
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
      
            console.log(response.data);
            // Redirect or perform other actions after successful submission
          } catch (error) {
            console.error(error);
            alert('There was an error with your request.');
          }
    };
      
    
    return (
        <>
            {data?.map((appointment, index) => {
                const { _id, description, status, location, date ,startTime,endTime,favourite} = appointment;
                return (
                    <div key={_id} className="item">
                        <div>
                            {/* Add onClick for redirection */}
                            <h3 onClick={() => handleClick(_id)}>
                                {index + 1}. {description}
                               
                            </h3>  <span
                                    onClick={(e) => {
                                        // Prevent the click event from triggering redirection
                                        e.stopPropagation();
                                        deleteUser.mutate(_id);
                                    }}
                                >
                                    Delete
                                </span>
                            <p>{status}</p>
                            <p>{location}</p>
                            <p>{updateDate(date)}</p>
                            <p>{updateTime(startTime)} - {updateTime(endTime)}</p>
                            <button onClick={()=>handleLike(_id,favourite)}>{favourite?"Unlike":"Like"}</button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default AppointmentList;
