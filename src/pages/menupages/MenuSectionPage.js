import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MenuSectionPage.css";

const MenuSectionsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menu, restaurant } = location.state || {};
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!menu) {
      console.error("No menu passed to MenuSectionPage.");
      setError("No menu selected.");
      return;
    }

    console.log("Menu object:", menu);
    console.log("Fetching sections for menu ID:", menu.id);

    fetch(`http://130.225.170.52:10331/api/menuSections/menu/${menu.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Sections fetched:", data);
        setSections(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not load menu sections.");
      });
  }, [menu]);

  const handleClick = (section) => {
    navigate("/menu/sectionItems", { state: { section, menu, restaurant } });
  };

  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>

      <div className="menu-container">
        <h1>{menu?.description} - {restaurant?.name} Sections</h1>

        {error ? (
          <p>{error}</p>
        ) : (
          <div className="menu-items">
            {sections.map((section) => (
              <div
                key={section.id}
                className="menu-item-container"
                onClick={() => handleClick(section)}
              >
                <button className="menu-btn">{section.name}</button>
              </div>
            ))}
          </div>
        )}

        <div className="button-container">
          <button className="add-btn">+</button>
        </div>
      </div>
    </div>
  );
};

export default MenuSectionsPage;
