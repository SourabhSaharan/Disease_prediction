import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/DoctorProfile.css";

// Import doctor images (use JPG instead of PNG)
import sujalImg from "../assets/doctors/sujal.jpg";
import sourabhImg from "../assets/doctors/Sourabh.jpg";
import jerryImg from "../assets/doctors/Jerry.jpg";
import sachinImg from "../assets/doctors/sachin.jpg";

// Map doctor IDs → images
// Map doctor IDs → images (updated to match your backend)
const imageMap = {
  1: sujalImg,     // Dr. Sujal Malik
  2: sourabhImg,   // Dr. Sourabh Saharan
  3: jerryImg,     // Dr. Jerry Singh
  4: sachinImg,    // Dr. Sachin Saini
};
function DoctorProfile() {
  const { id } = useParams(); // get doctor id from URL
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/doctors`);
        const found = res.data.find((doc) => String(doc.id) === id);
        setDoctor(found);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return <h2 style={{ textAlign: "center" }}>Doctor not found...</h2>;
  }

  return (
    <div className="doctor-profile">
      <div className="profile-card">
        {/* Use doctor image if available, else fallback to avatar */}
        <img
          src={imageMap[doctor.id] || `https://ui-avatars.com/api/?name=${doctor.name}&size=120&background=0D8ABC&color=fff`}
          alt={doctor.name}
          className="profile-avatar"
        />

        <h2>{doctor.name}</h2>
        <p className="speciality">{doctor.spec}</p>
        <p><strong>Phone:</strong> {doctor.phone}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Address:</strong> {doctor.address}</p>

        <div className="profile-actions">
          <button className="contact-btn">📞 Contact</button>
          <button className="book-btn">📅 Book Appointment</button>
        </div>

        <Link to="/doctors" className="back-link">⬅ Back to Doctors</Link>
      </div>
    </div>
  );
}

export default DoctorProfile;


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import "../styles/DoctorProfile.css";

// function DoctorProfile() {
//   const { id } = useParams(); // get doctor id from URL
//   const [doctor, setDoctor] = useState(null);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:5000/api/doctors`);
//         const found = res.data.find((doc) => String(doc.id) === id);
//         setDoctor(found);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchDoctor();
//   }, [id]);

//   if (!doctor) {
//     return <h2 style={{ textAlign: "center" }}>Doctor not found...</h2>;
//   }

//   return (
//     <div className="doctor-profile">
//       <div className="profile-card">
//         <img
//           src={`https://ui-avatars.com/api/?name=${doctor.name}&size=120&background=0D8ABC&color=fff`}
//           alt={doctor.name}
//           className="profile-avatar"
//         />
//         <h2>{doctor.name}</h2>
//         <p className="speciality">{doctor.spec}</p>
//         <p><strong>Phone:</strong> {doctor.phone}</p>
//         <p><strong>Email:</strong> {doctor.email}</p>
//         <p><strong>Address:</strong> {doctor.address}</p>

//         <div className="profile-actions">
//           <button className="contact-btn">📞 Contact</button>
//           <button className="book-btn">📅 Book Appointment</button>
//         </div>

//         <Link to="/doctors" className="back-link">⬅ Back to Doctors</Link>
//       </div>
//     </div>
//   );
// }

// export default DoctorProfile;
