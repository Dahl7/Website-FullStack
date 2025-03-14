import React from 'react';
import { useNavigate } from "react-router-dom";
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCustomerService = () => {
    console.log("Customer Service button clicked!");
  };

  const handleAboutUs = () => {
    console.log("About Us button clicked!");
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked!");
  };

  return (
    <div className="App">
      <button onClick={handleLogin} className="login-button">Login</button>
    <div className="button-container">
        <button onClick={handleCustomerService} className="other-buttons">Customer service</button>
        <button onClick={handleAboutUs} className="other-buttons">About us</button>
        <button onClick={handleSignUp} className="other-buttons">Sign up</button>
    </div>
    <div className="logo">
                <img src="/favicon.ico" alt="Logo" className="logo-image" />
            </div>
    </div>

  );
}

export default Homepage;
