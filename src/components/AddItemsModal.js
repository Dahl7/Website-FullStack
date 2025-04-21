import React, { useState, useEffect } from "react";
import "./AddItemsModal.css"; // We will create this file next

const AddItemModal = ({ isOpen, onClose, onSave, existingItem }) => {
  const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
      if (existingItem) {
        setName(existingItem.name || "");
        setDescription(existingItem.description || "");
        setPrice(existingItem.price || "");
        setTags(existingItem.tags ? existingItem.tags.join(", ") : "");
      } else {
        setName("");
        setDescription("");
        setPrice("");
        setTags("");
      }
    }, [existingItem]);

  const handleSave = () => {
    if (!name || !description || !price) {
      alert("All fields are required!");
      return;
    }
    onSave({
      name,
      description,
      price: parseFloat(price),
      tags: tags.split(",").map((tag) => tag.trim()), // Convert string to array
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h2>{existingItem ? "Edit Item" : "Add New Item"}</h2>

          <label>Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
          />

          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />

          <label>Tags</label>
          <input
            type="text"
            placeholder="Comma-separated (e.g., Lactose, Vegan)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div className="modal-buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  export default AddItemModal;
