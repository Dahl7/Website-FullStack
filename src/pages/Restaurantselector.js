import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './Restaurantselector.css';

const RestaurantItems = [
  { id: 1, name: 'Taco Bell' },
];

const RestaurantSelector = () => {
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item.name}`);
    navigate("/menu"); // ✅ Navigates to the menu page
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
              onClick={() => handleMenuClick(item)} // ✅ Click handler fixed
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Centered button inside menu-container */}
        <div className="button-container"></div>
      </div>

      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default RestaurantSelector;
