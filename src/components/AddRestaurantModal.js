import React, { useState } from "react";
import "./AddItemsModal.css"; // Make sure this file contains the .large-select class

const AddRestaurantModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [hours, setHours] = useState({ open: "08:00", close: "22:00" });
  const [description, setDescription] = useState("");
  const [stripeKey, setStripeKey] = useState("");

  const handleSave = () => {
    if (!name || !hours.open || !hours.close || !description || !stripeKey) {
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
      hours: `${hours.open}–${hours.close}`,
      description,
      stripeKey,
    });

    onClose();
  };

  const generateHourOptions = () => {
    const options = [];
    for (let h = 6; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        const time = `${hour}:${minute}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
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
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select
            value={hours.open}
            onChange={(e) => setHours({ ...hours, open: e.target.value })}
            className="large-select"
          >
            {generateHourOptions()}
          </select>
          <span style={{ fontSize: "16px" }}>to</span>
          <select
            value={hours.close}
            onChange={(e) => setHours({ ...hours, close: e.target.value })}
            className="large-select"
          >
            {generateHourOptions()}
          </select>
        </div>

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
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantModal;
