import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Doctors.css";
import BookingModal from "../components/BookingModal"; // <-- booking modal component

// Import doctor images (ensure paths/names are correct)
import sujalImg from "../assets/doctors/sujal.jpg";
import sourabhImg from "../assets/doctors/Sourabh.jpg";
import jerryImg from "../assets/doctors/Jerry.jpg";
import sachinImg from "../assets/doctors/sachin.jpg";

// Map doctor IDs -> image (safer than mapping by name)
const imageMap = {
  1: sujalImg,
  2: sourabhImg,
  3: jerryImg,
  4: sachinImg,
};

function Doctors() {
  const [query, setQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  // <- ADD THESE STATES (booking)
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async (search = "") => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/doctors?q=${search}`);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors(query);
  };

  return (
    <div className="doctors-container">
      <h2 className="page-title">Find a Doctor</h2>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name, speciality, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="doctor-cards">
        {doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          doctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-avatar">
                <img
                  src={
                    imageMap[doc.id] ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0D8ABC&color=fff`
                  }
                  alt={doc.name}
                />
              </div>

              <h3>{doc.name}</h3>
              <p className="speciality">{doc.spec}</p>
              <p>📞 {doc.phone}</p>
              <p>📧 {doc.email}</p>
              <p>📍 {doc.address}</p>

              {/* <-- REPLACE doctor-actions block with this: */}
              <div className="doctor-actions">
                {/* Contact opens email composer */}
                <button
                  className="contact-btn"
                  onClick={() => {
                    window.location.href = `mailto:${doc.email}?subject=Appointment%20Request%20for%20${encodeURIComponent(
                      doc.name
                    )}`;
                  }}
                >
                  Contact
                </button>

                {/* Book opens modal */}
                <button
                  className="profile-btn"
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setModalOpen(true);
                  }}
                >
                  Book
                </button>

                {/* View profile still goes to profile page */}
                <Link to={`/doctors/${doc.id}`} className="profile-btn" style={{ marginLeft: 8 }}>
                  View Profile
                </Link>
              </div>
              {/* <-- end new doctor-actions */}
            </div>
          ))
        )}
      </div>

      {/* <-- Add BookingModal here (after doctor-cards) */}
      {modalOpen && selectedDoctor && (
        <BookingModal
          open={modalOpen}
          doctor={selectedDoctor}
          onClose={() => setModalOpen(false)}
          onBooked={(appt) => {
            // optional: do something after booking (refresh list, show toast)
            console.log("Booked:", appt);
          }}
        />
      )}
    </div>
  );
}

export default Doctors;
