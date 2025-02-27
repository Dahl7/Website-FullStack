import React from 'react';
import './Menupage.css';

const Menupage = () => {
  return (
    <div className="menu-page">
      <div className="menu-container">
        <h1>Menu</h1>

        {/* Centered button inside menu-container */}
        <div className="button-container">
          <button className="add-btn">+</button>
        </div>
      </div>

      <div className="back-arrow">&#8592; </div>

      <div className="logo">
        <img src="./restaurantcollage1.jpg" alt="Logo" />
      </div>
    </div>
  );
};

export default Menupage;

