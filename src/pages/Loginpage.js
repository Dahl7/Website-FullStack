import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

const LoginPage = () => {
const navigate = useNavigate();
  return (
      <div className="login-page">
        {/* Back Button */}
        <div className="back-arrow" onClick={() => navigate(-1)}>
          &#8592;
        </div>

        <div className="login-container">
          <h1>Login</h1>
          <form className="login-form">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <div className="forgot-password">
              <a href="#">Forgot Password</a>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <button className="signup-btn">Sign up</button>
        </div>

        {/* Logo */}
        <div className="logo">
          <img src="/restaurantcollage1.jpg" alt="Logo" />
        </div>
      </div>
    );
  };

  export default LoginPage;
