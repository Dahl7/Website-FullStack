import React, { useState } from "react";
import "./AddItemsModal.css"; // reuse existing styles

const AddRestaurantModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [stripeKey, setStripeKey] = useState("");

  const handleSave = () => {
    if (!name || !hours || !description || !stripeKey) {
      alert("All fields are required!");
      return;
    }

    const validKey = "sk_test_51RGbAQQXilibX8f86EKIiZAPWD31kXJvmYDonVoDkxX1kwByVQlcei0jeD1dEFxs85UBUZA67oMXzHkzqf3bxFMn00kR4nDMXZ";
    if (stripeKey !== validKey) {
      alert("Invalid Stripe key.");
      return;
    }

    onSave({
      name,
      hours,
      description,
      stripeKey,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add New Restaurant</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter restaurant name"
        />

        <label>Opening Hours</label>
        <input
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="e.g. 08:00–22:00"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter restaurant description"
        />

        <label>Stripe Key</label>
        <input
          type="text"
          value={stripeKey}
          onChange={(e) => setStripeKey(e.target.value)}
          placeholder="Enter Stripe key"
        />

        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantModal;
