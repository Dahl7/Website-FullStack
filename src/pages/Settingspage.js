import React from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurantselector.css"; // Reuse the same CSS!

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
        <div className="back-arrow" onClick={() => navigate(-1)}>
        &#8592;
      </div>
      <div className="menu-wrapper">
        <h1>Settings</h1>

        <div className="button-container">
        </div>

      </div>

      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default SettingsPage;
