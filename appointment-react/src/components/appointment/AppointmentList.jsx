import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const AppointmentList = ({ data, handleDelete }) => {
    const navigate = useNavigate(); // Hook for redirection

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
    return (
        <>
            {data?.map((appointment, index) => {
                const { _id, description, status, location, date ,startTime,endTime} = appointment;
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
                                        handleDelete(_id);
                                    }}
                                >
                                    Delete
                                </span>
                            <p>{status}</p>
                            <p>{location}</p>
                            <p>{updateDate(date)}</p>
                            <p>{updateTime(startTime)} - {updateTime(endTime)}</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default AppointmentList;
