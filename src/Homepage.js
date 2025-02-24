import React from 'react';
import './Homepage.css';

function App() {
  const handleLogin = () => {
    // Handle login logic here (e.g., redirecting to a login page, showing a modal, etc.)
    console.log("Login button clicked!");
  };

  return (
    <div className="App">
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}

export default App;
