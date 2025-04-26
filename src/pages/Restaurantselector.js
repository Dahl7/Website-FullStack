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

    const handleMenuClick = async (restaurant) => {
      const accessToken = localStorage.getItem("accessToken");
      localStorage.setItem("restaurantId", restaurant.id);
      const response = await fetch("http://130.225.170.52:10331/api/apiKeys/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({ restaurantID: restaurant.id })
    });

    if (!response.ok) {
      throw new Error(`Failed to create API key. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Key created:", data);

    localStorage.setItem("apiKey", data.message);

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

            const handleRemoveItem = async (restaurantID) => {

            const accessToken = localStorage.getItem("accessToken");

              if (!window.confirm("Are you sure you want to remove this restaurant?")) return;
              try {
                const response = await fetch(`http://130.225.170.52:10331/api/restaurants/${restaurantID}`, {
                  method: "DELETE",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${accessToken}`

                  },
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                console.log(`✅ Restaurant with ID ${restaurantID} deleted successfully. Fetching updated restaurant list...`);

                // Fetch updated list of restaurants
                fetch(`http://130.225.170.52:10331/api/restaurants`)
                  .then(response => response.json())
                  .then(updatedRestaurants => {
                    console.log(updatedRestaurants);
                    setRestaurants(updatedRestaurants); // Updates the state
                  })
                  .catch(err => {
                    console.error("Restaurants cannot be fetched:", err);
                    alert("Restaurant has not been deleted");
                  });

              } catch (error) {
                alert("Restaurant has not been deleted, Please try again.");
              }
            };
  

    return (
      <div className="menu-page">
        <div className="menu-wrapper"> 
        <h1>Restaurants</h1>
          <div className="menu-container">
    
            <div className="menu-items">
              {restaurants.length > 0 ? (
                restaurants.map((item) => (
                  <button
                    key={item.id}
                    className="menu-btn"
                    onClick={() => handleMenuClick(item)}
                  >
                    {item.name}
                    <span
                        className="remove-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.id);
                        }}
                      >
                        🗑️
                      </span>
                  </button>
                ))
              ) : (
                <p></p>
              )}
            </div>
            <div className="button-container">
            <button className="add-btn" onClick={handleAddRestaurant}>+</button>
          </div>
          </div>
        </div>
    
        <div className="logo">
          <img src="/favicon.ico" alt="Logo" className="logo-image" />
        </div>
      </div>
    );
  };
    
export default RestaurantSelector;
