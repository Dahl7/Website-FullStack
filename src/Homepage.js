import React from 'react';
import './Homepage.css';

function App() {
  const handleLogin = () => {
    console.log("Login button clicked!");
  };

  const handleCustomerService = () => {
    console.log("Customer Service button clicked!");
  };

  const handleAboutUs = () => {
    console.log("About Us button clicked!");
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked!")
  }

  return (
    <div className="App">
    {/* Login */}
      <button onClick={handleLogin} className="login-button">Login</button>

    {/* Other buttons Container*/}
    <div className="button-container">
        <button onClick={handleCustomerService} className="other-buttons">Customer service</button>
        <button onClick={handleAboutUs} className="other-buttons">About us</button>
        <button onClick={handleSignUp} className="other-buttons">Sign up</button>
    </div>
    </div>

  );
}

export default App;
