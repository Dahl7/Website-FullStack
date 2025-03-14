import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menupage.css';

const Menupage = () => {
  const navigate = useNavigate();

  // State for storing menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Breakfast', path: "/menupages/breakfast"  },
    { id: 2, name: 'Lunch' },
    { id: 3, name: 'Dinner' },
    { id: 4, name: 'Desserts' },
    { id: 5, name: 'Drinks' }
  ]);

  // Function to navigate when a menu is clicked
  const handleMenuClick = (item) => {
    navigate(`/menu/${item.name.toLowerCase()}`);
  };

  // Function to add a new menu category
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

  // Function for previewing menu (not implemented yet)
  const previewMenu = () => {
    console.log("Preview menu");
  };

  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>

      <div className="menu-container">
        <h1>Menu</h1>

<div className="menu-items">
  {menuItems.map((menu) => (
    <div key={menu.id} className="menu-item-container">
      {/* Menu Button (Click anywhere on the button to navigate) */}
      <button className="menu-btn" onClick={() => handleMenuClick(menu)}>
        {menu.name}
      </button>
      {/* Trash Bin Icon (Click only this to delete) */}
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

      {/* Logo */}
      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default Menupage;
