import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Predictor from "./pages/Predictor";
import Appointments from "./pages/Appointments";

function App() {

  useEffect(() => {
    fetch("https://disease-ml-service.onrender.com/")
      .then(() => console.log("✅ ML service wake-up request sent"))
      .catch((err) => console.log("Wake-up failed:", err));
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Doctors from "./pages/Doctors";
// import DoctorProfile from "./pages/DoctorProfile";
// import Predictor from "./pages/Predictor";
// import Appointments from "./pages/Appointments"; // ✅ new import

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/doctors" element={<Doctors />} />
//           <Route path="/doctors/:id" element={<DoctorProfile />} />
//           <Route path="/predictor" element={<Predictor />} />
//           <Route path="/appointments" element={<Appointments />} /> {/* ✅ new route */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Doctors from "./pages/Doctors";
// import Predictor from "./pages/Predictor";
// import DoctorProfile from "./pages/DoctorProfile";


// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/predictor" element={<Predictor />} />
//         <Route path="/doctors/:id" element={<DoctorProfile />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }
