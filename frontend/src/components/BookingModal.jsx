// src/components/BookingModal.jsx
import React, { useState } from "react";
import axios from "axios";
import "./BookingModal.css"; // create styles below

export default function BookingModal({ open, onClose, doctor, onBooked }) {
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    date: "",
    time: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.patientName || !form.patientPhone || !form.date || !form.time) {
      setError("Please fill required fields (name, phone, date, time).");
      return;
    }
    setLoading(true);
    try {
      // Use relative path so proxy works if you set it
      const payload = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        ...form
      };
      const res = await axios.post("/api/appointments", payload);
      setLoading(false);
      onBooked && onBooked(res.data);
      onClose();
      // optional success toast
      alert("Appointment booked successfully!");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Failed to book appointment. Try again.");
    }
  };

  return (
    <div className="bm-backdrop">
      <div className="bm-modal">
        <h3>Book appointment with {doctor.name}</h3>

        <form onSubmit={handleSubmit} className="bm-form">
          <label>
            Your name *
            <input name="patientName" value={form.patientName} onChange={handleChange} />
          </label>

          <label>
            Phone * 
            <input name="patientPhone" value={form.patientPhone} onChange={handleChange} />
          </label>

          <label>
            Email
            <input name="patientEmail" value={form.patientEmail} onChange={handleChange} />
          </label>

          <label>
            Date * (YYYY-MM-DD)
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </label>

          <label>
            Time * (HH:MM)
            <input name="time" type="time" value={form.time} onChange={handleChange} />
          </label>

          <label>
            Notes
            <textarea name="notes" value={form.notes} onChange={handleChange} />
          </label>

          {error && <div className="bm-error">{error}</div>}

          <div className="bm-actions">
            <button type="button" onClick={onClose} className="bm-btn bm-cancel">Cancel</button>
            <button type="submit" className="bm-btn bm-submit" disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
