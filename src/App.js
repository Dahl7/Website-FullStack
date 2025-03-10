import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import RestaurantSelector from "./pages/Restaurantselector";
import Menupage from "./pages/Menupage";
import FetchTest from "./FetchTest";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/restaurant" element={<RestaurantSelector />} />
        <Route path="/menu" element={<Menupage />} /> 
        <Route path="/FetchTest" element={<FetchTest />} /> 

      </Routes>
    </Router>
  );
}

export default App;
