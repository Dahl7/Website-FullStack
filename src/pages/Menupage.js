import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Menupage.css";

const Menupage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const restaurant = location.state?.restaurant; 

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurant) {
      setError("No restaurant selected.");
      setLoading(false);
      return;
    }

    console.log(`Fetching menus for ${restaurant.name}`);

    fetch(`http://130.225.170.52:10331/menus/restaurant/${restaurant.id}`)
      .then((response) => {
        console.log("✅ API Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Menus fetched:", data);
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response format.");
        }
        setMenuItems(data);
      })
      .catch((err) => {
        setError("Failed to fetch menus.");
      })
      .finally(() => setLoading(false));
  }, [restaurant]);

  const handleMenuClick = (item) => {
    navigate(`/menu/breakfast`);
  };

  const handleAddItem = () => {
    const newMenu = prompt("Enter new menu name:");
    if (newMenu) {
      setMenuItems([...menuItems, { id: menuItems.length + 1, name: newMenu }]);
    }
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Are you sure you want to remove this menu?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };


  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>

      <div className="menu-container">
        <h1>Menu</h1>

<div className="menu-items">
  {menuItems.map((menu) => (
    <div key={menu.id} className="menu-item-container">

      <button className="menu-btn" onClick={() => handleMenuClick(menu)}>
      {menu.description}
      </button>

      <span className="remove-icon" onClick={() => handleRemoveItem(menu.id)}>
        🗑️
      </span>
    </div>
  ))}
</div>
        {/* Button to Add New Menu */}
        <div className="button-container">
          <button className="add-btn" onClick={handleAddItem}>+</button>
        </div>
      </div>

      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default Menupage;
