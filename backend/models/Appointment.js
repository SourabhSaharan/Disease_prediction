// backend/models/Appointment.js
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: Number, required: true },
  doctorName: { type: String, required: true },

  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientEmail: { type: String },

  date: { type: String, required: true }, // store as ISO date string or 'YYYY-MM-DD'
  time: { type: String, required: true }, // store as 'HH:MM' or free text
  notes: { type: String },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
