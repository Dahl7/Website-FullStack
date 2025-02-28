import React from 'react';
import './Restaurantselector.css';

const RestaurantItems = [
  { id: 1, name: 'Taco Bell' },


];

const Menupage = () => {
  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item.name}`);
  };



  return (
    <div className="menu-page">
      <div className="menu-container">
        <h1>Restaurants</h1>

        {/* Menu Items */}
        <div className="menu-items">
          {RestaurantItems.map((item) => (
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
        </div>
      </div>

    <div className="logo">
              <img src="/favicon.ico" alt="Logo" className="logo-image" />
          </div>
    </div>
  );
};

export default Menupage;
