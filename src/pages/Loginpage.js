import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Loginpage.css';

const LoginPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = (event) => {
    event.preventDefault(); 
    console.log("Login button clicked");
    navigate("/menu"); 
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <div className="forgot-password">
            <a href="#">Forgot Password</a>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <button className="signup-btn">Sign up</button>
      </div>
      <div className="back-arrow">&#8592;</div>
      <div className="logo">
        <img src="./restaurantcollage1.jpg" alt="Logo" />
      </div>
    </div>
  );
};

export default LoginPage;
