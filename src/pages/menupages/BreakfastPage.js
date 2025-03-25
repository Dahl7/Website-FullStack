import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BreakfastPage.css";
import AddItemModal from "../../components/AddItemsModal";

const BreakfastPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menu, restaurant } = location.state || {};

  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch items for this menu
  useEffect(() => {
    if (!menu || !restaurant) return;

    fetch(`http://130.225.170.52:10331/api/items/menu/${menu.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched menu items:", data);
        setItems(data);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        alert("Failed to load menu items.");
      });
  }, [menu, restaurant]);

  const openAddItemModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditItemModal = (index) => {
    setEditingItem({ ...items[index], index });
    setModalOpen(true);
  };

  const saveItem = (item) => {
    const payload = {
      name: item.name,
      description: item.description,
      price: item.price,
      tags: item.tags.split(","),
      menuID: menu.id,
    };

    if (item.index !== undefined) {
      const existingItemId = items[item.index].id;
      fetch(`http://130.225.170.52:10331/api/items/${existingItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(updated => {
          const updatedItems = [...items];
          updatedItems[item.index] = updated;
          setItems(updatedItems);
        })
        .catch(err => alert("Failed to update item"));
    } else {
      fetch(`http://130.225.170.52:10331/api/items/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(newItem => {
          setItems([...items, newItem]);
        })
        .catch(err => alert("Failed to add item"));
    }
  };

  const removeItem = (index) => {
    const itemId = items[index].id;

    fetch(`http://130.225.170.52:10331/api/items/${itemId}`, {
      method: "DELETE",
    })
      .then(() => {
        setItems(items.filter((_, i) => i !== index));
      })
      .catch(() => alert("Failed to delete item"));
  };

  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>

      <div className="menu-content">
        <div className="menu-container">
          <h1>{menu?.description} - {restaurant?.name}</h1>

          <div className="menu-items">
            {items.map((item, index) => (
              <div key={item.id} className="menu-item-container">
                <div className="menu-item-details">
                  <h3>{item.name}</h3>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                  <p><strong>Tags:</strong> {item.tags.join(", ")}</p>
                </div>
                <div className="menu-actions">
                  <button className="edit-btn" onClick={() => openEditItemModal(index)}>✏️ Edit</button>
                  <button className="remove-btn" onClick={() => removeItem(index)}>🗑️ Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button className="add-btn" onClick={openAddItemModal}>➕ Add Item</button>
          </div>
        </div>

        <div className="item-details">
          <h2>Item Details</h2>
          {editingItem ? (
            <div>
              <h3>{editingItem.name}</h3>
              <p><strong>Description:</strong> {editingItem.description}</p>
              <p><strong>Price:</strong> ${editingItem.price.toFixed(2)}</p>
              <p><strong>Tags:</strong> {editingItem.tags.join(", ")}</p>
            </div>
          ) : (
            <p>Select an item to edit.</p>
          )}
        </div>
      </div>

      <AddItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveItem}
        existingItem={editingItem}
      />
    </div>
  );
};

export default BreakfastPage;
