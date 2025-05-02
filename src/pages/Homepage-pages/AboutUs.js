// src/AboutUs.js
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At JAMNAW, we focus on making the restaurant service better and easier.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Team</h2>
        <p>
          We are a team
        </p>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions? We'd love to hear from you! Reach out at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
