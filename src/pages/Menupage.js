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
        console.log( response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Menus fetched:", data);
        if (!Array.isArray(data)) {
            console.error("Unexpected API response:", data);
            setMenuItems([]); 
        } else {
            setMenuItems(data);
        }
    })    
      .catch((err) => {
        setError("Failed to fetch menus.");
      })
      .finally(() => setLoading(false));
  }, [restaurant]);

  const handleMenuClick = (item) => {
    navigate(`/menu/breakfast`);
  };

  const handleAddItem = async () => {
    const newMenuName = prompt("Enter new menu name:");
    if (!newMenuName) return; 
  
    const newMenu = {
      description: newMenuName,
      restaurantID: restaurant.id, 
    };
  
    try {
      const response = await fetch("http://130.225.170.52:10331/menus/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMenu),
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const addedMenu = await response.json();
      console.log("Menu added:", addedMenu);
      fetch(`http://130.225.170.52:10331/menus/restaurant/${restaurant.id}`)
      .then(response => response.json())
      .then(updatedMenus => {

      setMenuItems(updatedMenus);})
  
    } catch (error) {
      console.error("Error adding menu:", error);
      alert("Failed to add menu. Please try again.");
    }
  };
  

  const handleRemoveItem = async (id) => {
    if (!window.confirm("Are you sure you want to remove this menu?")) return;
    try {
      const response = await fetch(`http://130.225.170.52:10331/menus/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      console.log(`✅ Menu with ID ${id} deleted successfully. Fetching updated menu list...`);
  
      // Fetch updated list of menus
      fetch(`http://130.225.170.52:10331/menus/restaurant/${restaurant.id}`)
        .then(response => response.json())
        .then(updatedMenus => {
          console.log(updatedMenus);
          setMenuItems(updatedMenus); // Updates the state
        })
        .catch(err => {
          console.error("Menus cannot be fetched:", err);
          alert("Menu has not been deleted");
        });
  
    } catch (error) {
      alert("Menu has not been deleted, Please try again.");
    }
  };
  

  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>

      <div className="menu-container">
        <h1>Menu</h1>

        <div className="menu-items">
  {Array.isArray(menuItems) ? (
    menuItems.length > 0 ? (
      menuItems.map((menu) => (
        <div key={menu.id} className="menu-item-container">
          <button className="menu-btn" onClick={() => handleMenuClick(menu)}>
            {menu.description}
          </button>
          <span className="remove-icon" onClick={() => handleRemoveItem(menu.id)}>
            🗑️
          </span>
        </div>
      ))
    ) : (
      <p>No menus available.</p>
    )
  ) : (
    <p>No menus available</p>
  )}
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
