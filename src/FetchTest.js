import { useState } from "react";

function FetchTest() {
  const [restaurantID, setRestaurantID] = useState("");
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setError("Access token not found. Please log in.");
      return;
    }

    const parsedId = parseInt(restaurantID);
    if (isNaN(parsedId)) {
      setError("Restaurant ID must be a valid number.");
      return;
    }

    console.log("Creating API key for restaurant:", parsedId);

    try {
      const response = await fetch("http://130.225.170.52:10331/api/apiKeys/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ restaurantID: parsedId })
      });

      console.log("Response received:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API key created:", data);
      setApiKey(data);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      setApiKey(null);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Create API Key</h2>

      <input
        type="number"
        value={restaurantID}
        onChange={(e) => setRestaurantID(e.target.value)}
        placeholder="Enter Restaurant ID"
        style={{ marginRight: "1rem" }}
      />
      <button onClick={handleSubmit}>Get API Key</button>

      {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}

      {apiKey && (
        <div style={{ marginTop: "1rem" }}>
          <h3>✅ API Key Created:</h3>
          <pre>{JSON.stringify(apiKey, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FetchTest;
