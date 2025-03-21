import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = ({ appointmentId, existingAppointmentData }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    location: '',
    status: 'pending',
  });
  const navigate = useNavigate();

  // Populate the form with existing appointment data if updating
  useEffect(() => {
    if (appointmentId && existingAppointmentData) {
      setFormData({
        date: existingAppointmentData.date,
        description: existingAppointmentData.description,
        location: existingAppointmentData.location,
        status: existingAppointmentData.status,
      });
    }
  }, [appointmentId, existingAppointmentData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define API URL and method based on whether it's update or create
    const endpoint = appointmentId
      ? `http://localhost:5000/api/appointments/${appointmentId}` // PUT (update)
      : 'http://localhost:5000/api/appointments'; // POST (create)

    const method = appointmentId ? 'put' : 'post'; // PUT if updating, POST if creating

    try {
      const response = await axios({
        method,
        url: endpoint,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data);
      // Redirect or perform other actions after successful submission
      navigate("/")
    } catch (error) {
      console.error(error);
      alert('There was an error with your request.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <InputField
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <button type="submit">
        {appointmentId ? 'Update Appointment' : 'Create Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;
