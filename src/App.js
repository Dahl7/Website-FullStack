import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import RestaurantSelector from "./pages/Restaurantselector";
import Menupage from "./pages/menupages/Menupage";
import MenuSectionsPage from "./pages/menupages/MenuSectionPage";
import SectionItemsPage from "./pages/menupages/SectionItemsPage";
import FetchTest from "./FetchTest";
import PostTest from "./PostTest";
import Orderpage from "./pages/Orderpage";
import Settingspage from "./pages/Settingspage";
import Successpage from "./pages/Paymentpages/Successpage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/restaurant" element={<RestaurantSelector />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/menu/sections" element={<MenuSectionsPage />} />
        <Route path="/menu/sectionItems" element={<SectionItemsPage />} />
        <Route path="/FetchTest" element={<FetchTest />} /> 
        <Route path="/PostTest" element={<PostTest />} /> 
        <Route path="/orders" element={<Orderpage />} />
        <Route path="/settings" element={<Settingspage />} />
        <Route path="/payment-success" element={<Successpage />} />
      </Routes>
    </Router>
  );
}

export default App;
