import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

const LoginPage = () => {
const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission refresh
    console.log("Login button clicked");
    navigate("/menu"); // Redirect to the Menu Page
  };
  return (
      <div className="login-page">
        {/* Back Button */}
        <div className="back-arrow" onClick={() => navigate(-1)}>
          &#8592;
        </div>

        <div className="login-container">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" required />

                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" required />
            <button type="submit" className="login-btn">Login</button>
          </form>

          <button className="signup-btn">Sign up</button>
        </div>

        {/* Logo */}
        <div className="logo">
            <img src="/favicon.ico" alt="Logo" className="logo-image" />
        </div>
      </div>
    );
  };

  export default LoginPage;
