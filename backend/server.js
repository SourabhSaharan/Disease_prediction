import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import Appointment from "./models/Appointment.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Test route
app.get("/", (req, res) => res.send("Backend is running ✅"));

// ✅ Prediction route → calls Flask ML service (port 5001)
app.post("/api/predict", async (req, res) => {
  try {
    console.log("👉 Forwarding symptoms to Flask:", req.body);
    const response = await axios.post("https://disease-ml-service.onrender.com/predict", req.body);
    console.log("✅ Flask response:", response.data);

    res.json(response.data); // send prediction back to frontend
  }catch (err) {
  console.error("========== ERROR ==========");
  console.error("Message:", err.message);

  if (err.response) {
    console.error("Status:", err.response.status);
    console.error("Data:", err.response.data);
  }

  if (err.request) {
    console.error("Request:", err.request);
  }

  console.error(err);

  res.status(500).json({
    error: err.message
  });
}
  //catch (err) {
   // console.error("❌ Prediction error:", err.message);
   // res.status(500).json({ error: "Prediction service failed" });
 // }
});

// ✅ Doctors route (static demo data for now)
app.get("/api/doctors", (req, res) => {
  const doctors = [
    { id: 1, name: "Dr. Sujal Malik", spec: "Dermatologist", phone: "+91-98899-12345", email: "sujal.derma@demo.com", address: "Sector 12, City" },
    { id: 2, name: "Dr. Sourabh Saharan", spec: "Cardiologist", phone: "+91-98765-22222", email: "sourabh.cardio@demo.com", address: "MG Road, City" },
    { id: 3, name: "Dr. Jerry Singh", spec: "General Surgeon", phone: "+91-97654-33333", email: "jerry.surgeon@demo.com", address: "Central Clinic, City" },
    { id: 4, name: "Dr. Sachin Saini", spec: "Neurologist", phone: "+91-96543-11111", email: "sachin.neuro@demo.com", address: "NeuroCare Hospital" }
  ];

  const q = req.query.q;
  if (q) {
    const filtered = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(q.toLowerCase()) ||
        doc.spec.toLowerCase().includes(q.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(doctors);
});

// ✅ Create appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const { doctorId, doctorName, patientName, patientPhone, patientEmail, date, time, notes } = req.body;

    if (!doctorId || !patientName || !patientPhone || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const appt = await Appointment.create({
      doctorId,
      doctorName,
      patientName,
      patientPhone,
      patientEmail,
      date,
      time,
      notes
    });

    res.json(appt);
  } catch (err) {
    console.error("❌ Create appointment error:", err);
    res.status(500).json({ error: "Could not create appointment" });
  }
});

// ✅ Get appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const { doctorId } = req.query;
    const filter = doctorId ? { doctorId: Number(doctorId) } : {};
    const appts = await Appointment.find(filter).sort({ date: 1, time: 1 });
    res.json(appts);
  } catch (err) {
    console.error("❌ List appointments error:", err);
    res.status(500).json({ error: "Could not fetch appointments" });
  }
});

// ✅ Start backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://127.0.0.1:${PORT}`));



// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import axios from "axios";
// import Appointment from "./models/Appointment.js";


// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/medware")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.log(err));

// // Test route
// app.get("/", (req, res) => res.send("Backend is running ✅"));

// // Prediction route (calls Flask ML service)
// app.post("/api/predict", async (req, res) => {
//   try {
//     const response = await axios.post("http://127.0.0.1:5001/predict", req.body);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: "Prediction failed" });
//   }
// });

// // Doctors route (static dummy data for now)
// app.get("/api/doctors", (req, res) => {
//   const doctors = [
//     {
//       id: 1,
//       name: "Dr. Sujal Malik",
//       spec: "Dermatologist",
//       phone: "+91-98899-12345",
//       email: "sujal.derma@demo.com",
//       address: "Sector 12, City"
//     },
//     {
//       id: 2,
//       name: "Dr. Sourabh Saharan",
//       spec: "Cardiologist",
//       phone: "+91-98765-22222",
//       email: "sourabh.cardio@demo.com",
//       address: "MG Road, City"
//     },
//     {
//       id: 3,
//       name: "Dr. Jerry Singh",
//       spec: "General Surgeon",
//       phone: "+91-97654-33333",
//       email: "jerry.surgeon@demo.com",
//       address: "Central Clinic, City"
//     },
//     {
//       id: 4,
//       name: "Dr. Sachin Saini",
//       spec: "Neurologist",
//       phone: "+91-96543-11111",
//       email: "sachin.neuro@demo.com",
//       address: "NeuroCare Hospital"
//     }
//   ];

//   // optional search filter (?q=...)
//   const q = req.query.q;
//   if (q) {
//     const filtered = doctors.filter(
//       (doc) =>
//         doc.name.toLowerCase().includes(q.toLowerCase()) ||
//         doc.spec.toLowerCase().includes(q.toLowerCase())
//     );
//     return res.json(filtered);
//   }

//   res.json(doctors);
// });
// // Create appointment
// app.post("/api/appointments", async (req, res) => {
//   try {
//     const { doctorId, doctorName, patientName, patientPhone, patientEmail, date, time, notes } = req.body;
//     if (!doctorId || !patientName || !patientPhone || !date || !time) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const appt = await Appointment.create({
//       doctorId,
//       doctorName,
//       patientName,
//       patientPhone,
//       patientEmail,
//       date,
//       time,
//       notes
//     });

//     res.json(appt);
//   } catch (err) {
//     console.error("Create appt error:", err);
//     res.status(500).json({ error: "Could not create appointment" });
//   }
// });

// // Get appointments (optional filter by doctorId)
// app.get("/api/appointments", async (req, res) => {
//   try {
//     const { doctorId } = req.query;
//     const filter = doctorId ? { doctorId: Number(doctorId) } : {};
//     const appts = await Appointment.find(filter).sort({ date: 1, time: 1 });
//     res.json(appts);
//   } catch (err) {
//     console.error("List appts error:", err);
//     res.status(500).json({ error: "Could not fetch appointments" });
//   }
// });



// const PORT = 5000;
// app.listen(PORT, () => console.log(`✅ Backend running on http://127.0.0.1:${PORT}`));
