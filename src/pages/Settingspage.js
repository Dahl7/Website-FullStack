import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurantselector.css";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stripeKey, setStripeKey] = useState("");

  useEffect(() => {
    fetch("http://130.225.170.52:10331/api/restaurants")
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error("Error fetching restaurants:", err));
  }, []);

  const handleRestaurantClick = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
  };

  const handleGenerateApiKey = async () => {
    if (!selectedRestaurantId) {
      alert("Please select a restaurant first!");
      return;
    }

    setLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Access token missing. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://130.225.170.52:10331/api/apiKeys/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ restaurantID: selectedRestaurantId })
      });

      if (!response.ok) {
        throw new Error(`Failed to create API key. Status: ${response.status}`);
      }

      const data = await response.json();
      alert(`API Key: ${data.message}`);

    } catch (error) {
      console.error("Error generating API key:", error);
      alert("Failed to generate API key. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStripeKey = () => {
    if (!stripeKey.trim()) {
      alert("Stripe key cannot be empty!");
      return;
    }
    alert("Stripe Key saved successfully!");
  };

  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>
        &#8592;
      </div>

      <div className="settings-container">

        {/* Left Side - Generate API Key */}
        <div className="settings-section">
          <h2>Generate API Key</h2>
          <p>Choose the restaurant you want to generate an API Key for:</p>

          <div className="menu-items">
            {restaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                className={`menu-btn ${selectedRestaurantId === restaurant.id ? "selected" : ""}`}
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                {restaurant.name}
              </button>
            ))}
          </div>

          <div className="button-container">
            <button className="add-btn" onClick={handleGenerateApiKey} disabled={loading}>
              {loading ? "Generating..." : "Enter"}
            </button>
          </div>
        </div>

        {/* Right Side - Input Stripe Key */}
        <div className="settings-section">
          <h2>Stripe Key</h2>
          <p>Enter your StripeKEY below:</p>

          <input
            type="text"
            className="input-field"
            value={stripeKey}
            onChange={(e) => setStripeKey(e.target.value)}
            placeholder="Please insert here"
          />

          <div className="button-container">
            <button className="add-btn" onClick={handleSaveStripeKey}>
              Save Stripe Key
            </button>
          </div>
        </div>

      </div>

      <div className="logo">
        <img src="/favicon.ico" alt="Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default SettingsPage;
