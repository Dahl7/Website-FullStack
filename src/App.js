import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Menupage";
import LoginPage from "./pages/Loginpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
