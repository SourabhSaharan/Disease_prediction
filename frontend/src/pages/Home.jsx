// frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            HeyDoc<span className="plus">+</span>
          </h1>
          <p>Your AI-powered health assistant</p>
          <div className="hero-buttons">
            <Link to="/predictor" className="btn primary">
              🧠 Try Predictor
            </Link>
            <Link to="/doctors" className="btn secondary">
              👨‍⚕️ Find Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why HeyDoc+</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🧾 Disease Prediction</h3>
            <p>
              Enter symptoms and let AI suggest possible diseases with
              precautions.
            </p>
          </div>
          <div className="feature-card">
            <h3>👨‍⚕️ Doctor Booking</h3>
            <p>Browse doctors and instantly book an appointment.</p>
          </div>
          <div className="feature-card">
            <h3>📅 Appointments</h3>
            <p>Keep track of all your bookings in one place.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
