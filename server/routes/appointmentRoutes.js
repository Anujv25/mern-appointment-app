/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments for the authenticated user
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *                   location:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [pending, confirmed, canceled]
 */
/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Creates a new appointment for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment created successfully"
 */

const express = require('express');
const { addAppointment,getAppointments} = require('../controllers/appointmentController');  // Import signup controller
const {addUserId} = require('../middleware/addUserId');
const router = express.Router();

// Define the route for user signup
router.post('/appointments',addUserId, addAppointment);  // Handle POST requests for appointments
router.get('/appointments',addUserId, getAppointments);  // Handle GET requests for appointments
module.exports = router;
