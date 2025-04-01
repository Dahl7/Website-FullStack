import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://130.225.170.52:10331/api/adminUsers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Temporary storage of login inforation
        localStorage.setItem("accessToken", data.access_token);

        navigate("/restaurant");
      } else {
        alert(data.error || "Email/Password is incorrect. Please try again");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
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
          <input type="email" name="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" required />

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
