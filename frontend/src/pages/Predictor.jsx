import React, { useState } from "react";
import axios from "axios";
import "../styles/Predictor.css";

function Predictor() {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const symptomsArray = symptoms
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (symptomsArray.length === 0) {
        setError("⚠️ Please enter at least one symptom.");
        setLoading(false);
        return;
      }

      const res = await axios.post("https://disease-backend-hn48.onrender.com/api/predict", {
        symptoms: symptomsArray,
      });

      setPrediction(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Prediction failed. Please check backend/ML service.");
    }

    setLoading(false);
  };

  return (
    <div className="predictor-container">
      <h2 className="predictor-title">🧑‍⚕️ Disease Predictor</h2>
      <form onSubmit={handlePredict} className="predictor-form">
        <textarea
          placeholder="Enter symptoms (comma separated)..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "⏳ Predicting..." : "🔍 Predict"}
        </button>
      </form>

      {error && <div className="error-box">{error}</div>}

      {prediction && (
        <div className="result-card">
          <h3 className="disease-name">✅ {prediction.disease}</h3>
          <p className="doctor-name">🩺 Suggested Doctor: {prediction.doctor}</p>
          <div className="precautions-box">
            <h4>⚠️ Precautions:</h4>
            <ul>
              {prediction.precautions.map((p, i) => (
                <li key={i}>✔️ {p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predictor;



// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Predictor.css";

// function Predictor() {
//   const [symptoms, setSymptoms] = useState("");
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handlePredict = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setPrediction(null);

//     try {
//       // Convert comma-separated input into array
//       const symptomsArray = symptoms
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//       if (symptomsArray.length === 0) {
//         setError("Please enter at least one symptom.");
//         setLoading(false);
//         return;
//       }

//       // ✅ Call Node backend (which forwards to Flask)
//       const res = await axios.post("http://127.0.0.1:5000/api/predict", {
//         symptoms: symptomsArray,
//       });

//       // Backend now returns { disease, doctor, precautions }
//       setPrediction(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Prediction failed, check backend/ML service.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="predictor-container">
//       <h2>Disease Predictor</h2>
//       <form onSubmit={handlePredict} className="predictor-form">
//         <textarea
//           placeholder="Enter symptoms (comma separated)..."
//           value={symptoms}
//           onChange={(e) => setSymptoms(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Predicting..." : "Predict"}
//         </button>
//       </form>

//       {error && (
//         <div className="prediction-result" style={{ color: "red" }}>
//           {error}
//         </div>
//       )}

//       {prediction && (
//         <div className="prediction-result">
//           <h3>Prediction Result</h3>
//           <p><strong>Disease:</strong> {prediction.disease}</p>
//           <p><strong>Suggested Doctor:</strong> {prediction.doctor}</p>
//           <p><strong>Precautions:</strong></p>
//           <ul>
//             {prediction.precautions.map((p, i) => (
//               <li key={i}>{p}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Predictor;
