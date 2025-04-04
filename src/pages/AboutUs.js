import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to <strong>JAMNAW</strong> — your go-to platform for seamless restaurant ordering.
      </p>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          We focus on making food ordering at restaurants faster, easier, and more enjoyable for everyone.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Values</h2>
        <ul>
          <li>💡 Innovation</li>
          <li>🧭 Integrity</li>
          <li>🎯 Customer Focus</li>
          <li>🤝 Collaboration</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Meet the Team</h2>
        <p>
          We’re a passionate group of developers, designers, and creators dedicated to improving how people interact with restaurants.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
