import React from 'react';
import './Loginpage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
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
      <div className="back-arrow">&#8592;</div>
      <div className="logo">
        {/* Add your logo image */}
        <img src="./restaurantcollage1.jpg" alt="Logo" />
      </div>
    </div>
  );
};

export default LoginPage;
