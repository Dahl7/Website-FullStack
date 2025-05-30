import React from 'react';
import { useNavigate } from "react-router-dom";
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  const handleCustomerService = () => {
    navigate("/customer-service");
  };

  const handleAboutUs = () => {
    navigate("/about-us");
  };


  const handleOrders = () => {
    const apiKey = window.prompt("Please enter your API key:");
    if (apiKey) {
      localStorage.setItem("apiKey", apiKey); // Save API key in localStorage
      navigate("/orders"); // Navigate after saving
    } else {
      alert("API key is required to access Orders.");
    }
  };


  return (
    <div className="App">

    <div className="main-buttons">
      <button onClick={handleLogin} className="login-button">Login</button>
      <button className="orders-btn" onClick={handleOrders}>
        Orders
      </button>
    </div>

    {/* Other buttons Container*/}
    <div className="button-container">
        <button onClick={handleCustomerService} className="other-buttons">Customer service</button>
        <button onClick={handleAboutUs} className="other-buttons">About us</button>
    </div>



    <div className="logo">
                <img src="/favicon.ico" alt="Logo" className="logo-image" />
            </div>
    </div>

  );
}

export default Homepage;
