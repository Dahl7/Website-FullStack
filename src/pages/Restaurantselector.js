import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurantselector.css";

const RestaurantSelector = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    fetch("http://130.225.170.52:10331/api/restaurants")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched restaurants:", data);
        setRestaurants(data); 
      })
      .catch(err => console.error("Error fetching restaurants:", err));
  }, []);

    const handleMenuClick = (restaurant) => {
      localStorage.setItem("restaurantId", restaurant.id); 
      navigate("/menu", { state: { restaurant } });        
    };    
    const handleAddRestaurant = async () => {
      const newRestaurantName = prompt("Enter new Restaurant name:");
      if (!newRestaurantName) return; 

      const accessToken = localStorage.getItem("accessToken");
      console.log("Access token:", accessToken); 
    
      const newRestaurant = {
        latitude: 52.6761,          
        longitude: 11.5683,
        name: newRestaurantName
      };
    
      try {
        const response = await fetch("http://130.225.170.52:10331/api/restaurant/add", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}` 
          },
          body: JSON.stringify(newRestaurant),
        });
    
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const addedRestaurant = await response.json();
        console.log("Restaurant added:", addedRestaurant);
        fetch("http://130.225.170.52:10331/api/restaurants")
        .then(response => response.json())
        .then(updatedRestaurants => {
          setRestaurants(updatedRestaurants);
        });
      
      } catch (error) {
        console.error("Error adding restaurant:", error);
        alert("Failed to add restaurant. Please try again.");
      }
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
      <div className="button-container">
          <button className="add-btn" onClick={handleAddRestaurant}>+</button>
        </div>
      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default RestaurantSelector;
