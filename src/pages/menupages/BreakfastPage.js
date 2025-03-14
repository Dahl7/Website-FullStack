import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BreakfastPage.css";
import AddItemModal from "../../components/AddItemsModal";

const BreakfastPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { name: "Pancakes", description: "Fluffy pancakes with syrup.", price: 5, tags: ["Sweet"] },
    { name: "Omelette", description: "Egg omelette with cheese and tomatoes.", price: 7, tags: ["Protein"] },
    { name: "Toast", description: "Crispy toast with butter and jam.", price: 3, tags: ["Quick"] },
    { name: "Coffee", description: "Freshly brewed coffee.", price: 2, tags: ["Drink"] }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Open the modal to add a new item
  const openAddItemModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  // Open the modal to edit an existing item
  const openEditItemModal = (index) => {
    setEditingItem({ ...items[index], index });
    setModalOpen(true);
  };

  // Save the new or edited item
  const saveItem = (item) => {
    if (item.index !== undefined) {
      // Editing existing item
      const updatedItems = [...items];
      updatedItems[item.index] = { name: item.name, description: item.description, price: item.price, tags: item.tags.split(",") };
      setItems(updatedItems);
    } else {
      // Adding a new item
      setItems([...items, { name: item.name, description: item.description, price: item.price, tags: item.tags.split(",") }]);
    }
  };

  // Function to remove an item
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="menu-page">
      <div className="back-arrow" onClick={() => navigate(-1)}>🔙</div>

      <div className="menu-content"> {/* ✅ New wrapper for side-by-side layout */}

        {/* Left Side: Menu List */}
        <div className="menu-container">
          <h1>Breakfast Menu</h1>

          <div className="menu-items">
            {items.map((item, index) => (
              <div key={index} className="menu-item-container">
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

        {/* Right Side: Item Details/Editor */}
        <div className="item-details">
          {/* Placeholder for selected item details OR modal */}
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

      {/* Add/Edit Item Modal */}
      <AddItemModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={saveItem} existingItem={editingItem} />
    </div>

  );
};

export default BreakfastPage;
