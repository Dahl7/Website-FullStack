import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SectionItemsPage.css";

const SectionItemsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { section, menu, restaurant } = location.state || {};
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!section) return;

    fetch(`http://130.225.170.52:10331/api/menuItems/section/${section.id}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load items.");
      });
  }, [section]);

  return (
    <div className="menu-page">
          <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>

          <div className="menu-container">
            <h1>{section?.name || "Items"}</h1>

            <div className="menu-items">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="menu-item-container">
                    <div className="menu-item-details">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                      <p><strong>Type:</strong> {item.type}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in this section.</p>
              )}
            </div>
          </div>
        </div>
  );
};

export default SectionItemsPage;
