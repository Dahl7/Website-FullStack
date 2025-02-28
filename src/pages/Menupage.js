import React from 'react';
import './Menupage.css';

const menuItems = [
  { id: 1, name: 'Breakfast' },
  { id: 2, name: 'Lunch' },
  { id: 3, name: 'Dinner' },
  { id: 4, name: 'Deserts' },
  { id: 5, name: 'Drinks' },

];

const Menupage = () => {
  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item.name}`);
  };

  const handleaddItem = (item) => {
    console.log("Clicked on add");
  };

  const previewMenu = () => {
    console.log("Preview menu");
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        <h1>Menu</h1>

        {/* Menu Items */}
        <div className="menu-items">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="menu-item" 
              onClick={() => handleMenuClick(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
        
        {/* Centered button inside menu-container */}
        <div className="button-container">
        <button className="add-btn" onClick={() => handleaddItem()}>+</button>
        </div>
      </div>

      <button className="preview-btn" onClick={previewMenu}>Preview Menu</button>
    <div className="logo">
              <img src="/favicon.ico" alt="Logo" className="logo-image" />
          </div>
    </div>
  );
};

export default Menupage;
