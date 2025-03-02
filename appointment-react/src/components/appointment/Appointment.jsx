import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Appointments = () => {
  const { id } = useParams(); // Get the appointment ID from the URL if it's in update mode
  const [existingAppointmentData, setExistingAppointmentData] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the existing appointment data for updating
      axios
        .get(`http://localhost:5000/api/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          setExistingAppointmentData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching appointment data', error);
        });
    }
  }, [id]);

  return (
    <div>
      <h1>{id ? 'Update Appointment' : 'Create Appointment'}</h1>
      <AppointmentForm
        appointmentId={id}
        existingAppointmentData={existingAppointmentData}
      />
    </div>
  );
};

export default Appointments;
