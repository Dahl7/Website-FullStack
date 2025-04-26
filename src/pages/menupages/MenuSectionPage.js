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

  const handleAddSection = async () => {
    const name = prompt("Enter new section name:");
    if (!name) return;
    const accessToken = localStorage.getItem("accessToken");


    const newSection = {
      name,
      menuID: menu.id,
    };

    try {
      const response = await fetch("http://130.225.170.52:10331/api/menuSections/add", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                   "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(newSection),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const added = await response.json();
      setSections((prev) => [...prev, added]);
    } catch (err) {
      console.error("Failed to add section:", err);
      alert("Could not add new section. Try again.");
    }
  };



  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>
      <div className="menu-wrapper"> 
      <h2>{menu?.description} - {restaurant?.name} Sections</h2>

      <div className="menu-container">

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
          <button className="add-btn" onClick={handleAddSection}>+</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MenuSectionsPage;
