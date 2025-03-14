import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurantselector.css";

const RestaurantSelector = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    fetch("http://130.225.170.52:10331/restaurants")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched restaurants:", data);
        setRestaurants(data); 
      })
      .catch(err => console.error("Error fetching restaurants:", err));
  }, []);

  const handleMenuClick = (restaurant) => {
    navigate("/menu", { state: { restaurant } }); 
  };
  

  return (
    <div className="menu-page">
      <div className="menu-container">
        <h1>Restaurants</h1>

        <div className="menu-items">
          {restaurants.length > 0 ? (
            restaurants.map((item) => (
              <button
                key={item.id}
                className="menu-btn"
                onClick={() => handleMenuClick(item)}
              >
                {item.name}
              </button>
            ))
          ) : (
            <p></p>
          )}
        </div>

        <div className="button-container"></div>
      </div>

      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default RestaurantSelector;
