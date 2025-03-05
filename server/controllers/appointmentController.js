const Appointments = require('../models/Appointment');  // Import the User model


// Add Addpointment controller function
const addAppointment = async (req, res) => {
  const {date,startTime,endTime, description, location,status } = req.body;
  const user = req.id;  // Get the user ID from the request object
  if (!date || !status) {
    return res.status(400).json({ error: 'Date and status are required' });
  }

  try {
  
    // Create a new appointment
    const newAppointment = new Appointments({
      user,  date,startTime,endTime, description, location,status 
    });

    // Save the appointment to the database
    await newAppointment.save();

    // Respond with success message 
    res.status(201).json({
      message: 'Appointment created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create appointment', error: error.message })
  }
};


const getAppointments=async (req,res)=>{ 
  const user = req.id;  // Get the user ID from the request object
  // Extract the 'query' parameter from the request
  const { query } = req.query;
  try {
     // Initialize an empty filter object with the user ID to filter by the logged-in user
     const filter = { user };
     if (query) {
      // Using the $or operator to search the 'query' across multiple fields
      filter.$or = [
        { description: { $regex: query, $options: 'i' } },  // Search in description (case-insensitive)
        { location: { $regex: query, $options: 'i' } },      // Search in location (case-insensitive)
        { status: { $regex: query, $options: 'i' } }         // Search in status (case-insensitive)
      ];
    }

    // Query the appointments collection with the constructed filter
    const appointments = await Appointments.find(filter);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' ,error});
  }
}

const getAppointmentById=async (req,res)=>{
  const {id}=req.params;
  try {
    const appointment=await Appointments.findById(id);
    if(!appointment){
      return res.status(404).json({message:'Appointment not found'});
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error',error:error.message});
  }
}


const updateAppointmentsById=async (req,res)=>{
  const {id}=req.params;
  const {date,startTime,endTime, description, location,status,favourite } = req.body;
  try {
    const appointment=await Appointments.findByIdAndUpdate(id,{
      date,startTime,endTime, description, location,status,description,favourite
    },{new:true});  // Return the updated document
    console.log(appointment)
    if(!appointment){
      return res.status(404).json({message:'Appointment not found'});
    }   
   
    res.status(200).json(appointment)
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error',error:error.message});
  } 
}

const deleteAppointmentsById=async (req,res)=>{
  const {id}=req.params;
  try {
    const appointment=await Appointments.findByIdAndDelete(id);
    if(!appointment){
      return res.status(404).json({message:'Appointment not found'});
    }
    res.status(200).json({message:'Appointment deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error',error:error.message});
  }
}


const markAppointmentFavourite=async (req,res)=>{
  const {id}=req.params;
  const {favourite } = req.body;
  try {
    const appointment=await Appointments.findByIdAndUpdate(id,{
     favourite
    },{new:true});  // Return the updated document
    if(!appointment){
      return res.status(404).json({message:'Appointment not found'});
    }   
   
    res.status(200).json(appointment)
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error',error:error.message});
  } 
}

module.exports = { addAppointment,getAppointments,getAppointmentById,updateAppointmentsById,deleteAppointmentsById,markAppointmentFavourite };